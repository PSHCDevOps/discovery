import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener
} from '@angular/core';
import { SearchService } from './search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActiveFiltersComponent } from './filters/active-filters.component';
import { ModalService } from '../../common/modal.service';
import { FiltersComponent } from './filters.component';

declare const document: any;
declare const $: any;
@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()
  selected_filters: any[];
  @ViewChild(ActiveFiltersComponent)
  activeFiltersComponent: ActiveFiltersComponent;
  @ViewChild(FiltersComponent)
  filtersComponent: FiltersComponent;

  vw_contracts = true;
  vw_vendors = false;
  error_message;
  contracts_compare;
  contracts_results = [];
  contracts_w_no_records = [];
  contract_vehicles;
  zones;
  service_categories;
  vendors_results;
  vendors_no_results = false;
  show_details = false;
  show_results = false;
  compare_tbl: any[] = [];
  vehicles;
  results;
  _sort_by: string;
  num_show = 3;
  _spinner: boolean;
  filters: any[];
  scroll_buttons = false;
  server_error = false;
  obligated_amounts_list: any = [];
  agency_performance_list: any = [];
  vehicle_vendors_total: number;
  changedVehicleOption:string = "";
  isVehiclechanged:number = 0;
  more_info = false;
  interval;
  int_vehicles;
  total_vendors_met_criteria = 0;
  selected_duns = '';
  show_vendor_details = false;
  vendors_count: any[] = [];
  vendors_request_complete = false;
  naics_selected: any[] = [];
  pscs_selected: any[] = [];
  keywords_selected: any[] = [];
  service_categories_selected: any[] = [];
  params: string;
  table_scroll_set = false;

  @HostListener('window:resize')
  onResize() {
    if (document.getElementById('discovery').classList.contains('push')) {
      this.hideSideNavFilters();
    }
    this.initSlider();
  }
  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.searchService.setApiUrl();
    /** Check to see if there are any queryparams */
    if (this.route.snapshot.queryParamMap.keys.length > 0) {
      this.spinner = true;
    } else {
      this.spinner = false;
    }
    this.initSlider();
    window.onpopstate = function(event) {
      if (document.location.href.substr('/search') !== -1) {
        window.location.reload();
      }
    };
  }
  get sort_by(): string {
    return this._sort_by;
  }
  set sort_by(value: string) {
    this._sort_by = value;
    this.vehicle_vendors_total = this.returnVendorsMeetCriteriaTotalByVehicle(
      value
    );
  }
  get spinner(): boolean {
    return this._spinner;
  }
  set spinner(value: boolean) {
    this._spinner = value;
  }

  buildSelectedItems(arr: string[]): any[] {
    const items = [];
    for (const i of arr) {
      const item = {};
      item['value'] = i;
      items.push(item);
    }
    return items;
  }
  resetTableScrolling() {
    $('.scroll-tip').addClass('hide slideInLeft');
    if (document.getElementById('tbl-compare')) {
      /** Reset scroll window widths on re submit */
      $('#overflow-compare .scroll-div1, #overflow-compare .scroll-div2').css(
        'width',
        '100%'
      );
    }
  }
  initScrollBars() {
    this.resetTableScrolling();
    this.interval = setInterval(() => {
      if (document.getElementById('tbl-compare') && !this.table_scroll_set) {
        /** Reset scroll window widths on re submit */
        let margin_comp = 0;
        if (this.compare_tbl.length > 2) {
          /* Set the first column to be fixed */
          margin_comp = 220;
          $('#tbl-compare-container, #tbl-compare, #col-white').addClass(
            'fixed'
          );
        } else {
          $('#tbl-compare-container, #tbl-compare, #col-white').removeClass(
            'fixed'
          );
        }
        const w = $('#tbl-compare').innerWidth() + margin_comp + 'px';
        $('#overflow-compare .scroll-div1, #overflow-compare .scroll-div2').css(
          'width',
          w
        );
        $('#overflow-compare .scroll-view-topscroll').scroll(function() {
          $('#overflow-compare .scroll-view').scrollLeft(
            $('#overflow-compare .scroll-view-topscroll').scrollLeft()
          );
        });
        $('#overflow-compare .scroll-view').scroll(function() {
          $('#overflow-compare .scroll-view-topscroll').scrollLeft(
            $('#overflow-compare .scroll-view').scrollLeft()
          );
        });
        clearInterval(this.interval);
        this.showScrollTip();
        this.table_scroll_set = true;
      }
    }, 500);
  }

  getFilterVehicles(filters: any[]): any[] {
    let items = [];
    for (const item of filters) {
      if (item['name'] === 'vehicles') {
        items = item['selected'];
      }
    }
    return items;
  }
  reset(bool) {
    this.server_error = false;
    this.show_results = false;
    this.vendors_no_results = false;
    this.compare_tbl = [];
    this.initScrollBars();
  }
  getSelected(filters, key) {
    const items = [];
    for (const item of filters) {
      if (item.name === key) {
        for (const i of item.selected) {
          items.push(i);
        }
      }
    }
    return items;
  }
  returnSelectedServiceCategories(filters): any[] {
    let categories = [];
    const naics = this.filtersComponent.getNaicsSelected();
    const pscs = this.filtersComponent.getPscsSelected();
    const keywords = this.filtersComponent.getKeywordsSelected();
    categories = this.getSelected(filters, 'service_categories');
    if (naics.length > 0) {
      for (const naic of naics) {
        for (const pool of naic.pools_ids) {
          if (!this.searchService.existsIn(categories, pool, 'value')) {
            categories.push({
              value: pool,
              description: this.filtersComponent.getServiceCategoriesDescription(
                pool
              )
            });
          }
        }
      }
    }
    if (pscs.length > 0) {
      for (const psc of pscs) {
        for (const pool of psc.pools_ids) {
          if (!this.searchService.existsIn(categories, pool, 'value')) {
            categories.push({
              value: pool,
              description: this.filtersComponent.getServiceCategoriesDescription(
                pool
              )
            });
          }
        }
      }
    }
    if (keywords.length > 0) {
      for (const keyword of keywords) {
        for (const pool of keyword.pools_ids) {
          if (!this.searchService.existsIn(categories, pool, 'value')) {
            categories.push({
              value: pool,
              description: this.filtersComponent.getServiceCategoriesDescription(
                pool
              )
            });
          }
        }
      }
    }
    return categories;
  }
  returnUnique(items: any[]): any[] {
    const unique_items = [];
    for (const item of items) {
      if (!this.searchService.existsIn(unique_items, item.id, 'id')) {
        unique_items.push(item);
      }
    }
    return unique_items;
  }
  submitSelectedFilters(filters) {
    console.log('clicked submit on search page')
    if (filters.length === 0) {
      this.filtersComponent.resetFilters();
      this.reset(true);
      return;
    }
    this.reset(true);
    this.spinner = true;
    this.table_scroll_set = false;
    this.searchService.activeFilters = filters;
    this.zones = this.filtersComponent.getZones();
    this.contract_vehicles = this.filtersComponent.getContractVehicles();

    this.service_categories = this.filtersComponent.getServiceCategories();
    this.naics_selected = this.getSelected(filters, 'naics');
    this.pscs_selected = this.getSelected(filters, 'pscs');
    this.keywords_selected = this.getSelected(filters, 'keywords');
    this.service_categories_selected = this.returnSelectedServiceCategories(
      filters
    );

    // console.log(this.searchService.activeFilters);

    this.searchService
      .getVehiclesToCompare(this.searchService.activeFilters)
      .subscribe(
        data => {
          console.log('received response')
          if (data['count'] === 0) {
            this.noResults();
            return;
          }

          const vehicles = [];
          const vehicles_ids = [];

          for (const item of data['results']) {
            for (const vehicle of this.contract_vehicles) {
              if (item === vehicle.id) {
                vehicles.push(vehicle);
                vehicles_ids.push(vehicle.id);
                if (this.contract_vehicles.length !== data['results'].length) {
                  this.filtersComponent.setContractVehiclesInFilter(
                    vehicle.id,
                    vehicle.name
                  );
                }
              }
            }
          }

         if(this.service_categories_selected.length > 0) {
            this.filtersComponent.setNaicsByServiceCategories(this.service_categories_selected);
            this.filtersComponent.setPscsByServiceCategories(this.service_categories_selected);
            this.filtersComponent.setKeywordsByServiceCategories(this.service_categories_selected);
          } else {
            this.filtersComponent.filterNaicsByVehiclesInFilter(vehicles_ids);
            this.filtersComponent.filterPscsByVehiclesInFilter(vehicles_ids);
            this.filtersComponent.filterKeywordsByVehiclesInFilter(vehicles_ids);
          }
          if(this.naics_selected.length > 0 || this.pscs_selected.length > 0 || this.keywords_selected.length > 0) {
            this.filtersComponent.filterServiceCategoriesInFilter(this.service_categories_selected);
          } else {
            this.filtersComponent.filterServiceCategoriesByVehiclesInFilter(vehicles_ids);
          }
          this.filters = this.filtersComponent.getSelectedFilters();
          this.searchService.activeFilters = this.filters;
          if (!this.route.snapshot.queryParamMap.has('vendors')) {
            this.searchService.setQueryParams(this.searchService.activeFilters);
          }
          this.setParams(this.filters);
          this.getVendorsTotalByVehicle(vehicles);
        },
        error => {
          this.error_message = <any>error;
          this.server_error = true;
          this.spinner = false;
        }
      );
  }

  updatechangedVehicleOption(newVehicle){
    this.changedVehicleOption = newVehicle;
    this.isVehiclechanged = 1;
  }

  noResults() {
    this.spinner = false;
    this.show_results = true;
    this.vendors_no_results = true;
  }

  setParams(filters) {
    let params = '';
    for (const filter of filters) {
      if (filter['name'] === 'keywords') {
        params +=
          '&keywords=' +
          this.searchService.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'vehicles') {
        params +=
          '&vehicles=' +
          this.searchService.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'service_categories') {
        params +=
          '&pools=' +
          this.searchService.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'setasides') {
        params +=
          '&setasides=' +
          this.searchService.getSelectedFilterList(filter['selected'], ',');

        //params += '&vehicles=' + this.searchService.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'naics') {
        params +=
          '&naics=' +
          this.searchService.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'pscs') {
        params +=
          '&pscs=' +
          this.searchService.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'zone') {
        params +=
          '&zones=' +
          this.searchService.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'pop') {
        params += '&countries=' + filter['selected'][0].value;
        if (filter['selected'][1]) {
          params += '&states=' + filter['selected'][1].value;
        }
      }
      if (filter['name'] === 'obligated_amount') {
        const threshold = filter['selected'][0].value;
        params += '&amount=0' + ',' + threshold;
      }
      if (filter['name'] === 'agency_performance') {
        params +=
          '&agencies=' +
          this.searchService.getSelectedFilterList(filter['selected'], ',');
      }
      this.params = params;
    }
  }

  getContractCompareResults(vehicles) {
    let count = 0;
    let total_vendors = 0;

    for (const vehicle of vehicles) {
      var selectedServiceCategory = this.searchService.getServiceCategoryFilterByVehicle(vehicle.id);
      if(vehicles.length > 1 && selectedServiceCategory.length == 0 && this.getActiveServiceCategoriesCount() !== 0) {
        count++;
        continue;
      }
      this.searchService
        .getVehicleVendorsMeetCriteria(
          this.searchService.activeFilters,
          vehicle.id,
          selectedServiceCategory
        )
        .subscribe(
          data => {
            const item = {};
            item['id'] = vehicle.id;
            item['vendors_total'] = this.returnVehicleCountByVehicle(
              vehicle.id
            );
            item['vendors_results_total'] = data['count'];
            item['description'] = vehicle.name;
            item['service_categories'] = this.filtersComponent.getServiceCategoriesByVehicle(vehicle.id);
            item['capabilities'] = 0;
            if(this.service_categories_selected.length > 0) {
              item['pscs'] = this.filtersComponent.getPscsByServiceCategoriesAndVehicle(this.service_categories_selected, vehicle.id);
              item['naics'] = this.filtersComponent.getNaicsByServiceCategoriesAndVehicle(this.service_categories_selected, vehicle.id);
            } else {
              item['pscs'] = this.returnUnique(this.filtersComponent.getPSCsByVehicle(vehicle.id));
              item['naics'] = this.filtersComponent.getNaicsByVehicle(vehicle.id);
            }

            const info = this.filtersComponent.getVehicleInfo(vehicle.id);
            item['tier'] = info['tier'].name;
            item['gsa'] = info['poc'];
            item['ordering_guide'] = info['ordering_guide'];

            if (data['count'] > 0) {
              total_vendors += data['count'];
              this.compare_tbl.push(item);
            }
            count++;
            /** On Complte do this */
            if (count === vehicles.length) {
              this.spinner = false;
              this.show_results = true;
              this.server_error = false;
              if (total_vendors === 0) {
                this.vendors_no_results = true;
              } else {
                this.sort_by = this.compare_tbl[0]['id'];
                this.compare_tbl = this.compare_tbl.sort(this.searchService.sortByDescriptionAsc);
                this.total_vendors_met_criteria = total_vendors;
                if (
                  this.route.snapshot.queryParamMap.has('vendors') ||
                  this.vw_vendors
                ) {
                  this.viewVendors();
                } else {
                  this.viewContracts();
                }
              }
            }
            this.updatechangedVehicleOption(this.sort_by);
          },
          error => {
            this.error_message = <any>error;
            this.server_error = true;
            this.spinner = false;
          }
        );
    }
  }

  returnVehicleCountByVehicle(vehicle: string): any {
    let count = 0;
    for (const item of this.searchService.total_vendors_per_vehicle) {
      if (item.id === vehicle) {
        count = item.total;
      }
    }
    return count;
  }
  getActiveServiceCategoriesCount() {
    let count = 0;
    for (const filter of this.searchService.activeFilters) {
      if (filter['name'] === 'service_categories') {
        count = filter.length;
      }
    }
    return count;
  }
  getVendorsTotalByVehicle(vehicles) {
    let count = 0;
    const vendor_totals = [];
    for (const vehicle of vehicles) {
      var selectedServiceCategory = this.searchService.getServiceCategoryFilterByVehicle(vehicle.id);
      if(vehicles.length > 1 && selectedServiceCategory.length == 0 && this.getActiveServiceCategoriesCount() !== 0) {
        count++;
        continue;
      }
      this.searchService
        .getVehicleVendorsMeetCriteria([], vehicle.id, selectedServiceCategory)
        .subscribe(
          data => {
            const item = {};
            item['id'] = vehicle.id;
            item['total'] = data['count'];
            if (!this.searchService.existsIn(vendor_totals, vehicle.id, 'id')) {
              vendor_totals.push(item);
            }
            count++;
            if (count === vehicles.length) {
              this.searchService.total_vendors_per_vehicle = vendor_totals;
              this.getContractCompareResults(vehicles);
            }
          },
          error => {
            this.error_message = <any>error;
            this.server_error = true;
            this.spinner = false;
          }
        );
    }
  }
  returnVendorsMeetCriteriaTotalByVehicle(vehicle: string): number {
    let total = 0;
    for (const item of this.compare_tbl) {
      if (item.id === vehicle) {
        total = item['vendors_results_total'];
      }
    }
    return total;
  }
  showSpinner(bool: boolean) {
    this.spinner = bool;
  }
  getFirstVehicleWithVendors() {
    for (const item of this.compare_tbl) {
      if (item.vendors_results_total > 0) {
        return item.id;
      }
    }
  }
  /** Checks if vehicles were submitted  */
  returnSubmittedVehicles(): any[] {
    for (const item of this.searchService.activeFilters) {
      if (item.name === 'vehicles') {
        return item;
      }
    }
    return [];
  }
  initSlider() {
    const w = window.innerWidth;
    document.getElementById('slides-container').style.width = w * 2 + 30 + 'px';
    document.getElementById('slide-search').style.width = w + 'px';
    document.getElementById('slide-vendor').style.width = w + 'px';
    if (this.show_vendor_details) {
      document.getElementById('slides-container').style.marginLeft = -w + 'px';
    }

    this.showScrollTip();   
  }
  showScrollTip() {
    if (
      $('#compare-scroll .scroll-div1').width() > $('#compare-scroll').width()
    ) {
      $('.scroll-tip').removeClass('hide slideInLeft');
    } else {
      $('.scroll-tip').addClass('hide slideInLeft');
    }
  }
  filterResultsByVehicle(vehicle: string) {
    return this.results.vendors.filter(
      vendor => vendor.vehicles.indexOf(vehicle) !== -1
    );
  }
  clearActiveFilters(bool) {
    this.activeFiltersComponent.clear();
  }
  viewVendors() {
    this.vw_vendors = true;
    this.vw_contracts = false;
    this.router.navigate(['/search'], {
      queryParams: { vendors: 'list' },
      queryParamsHandling: 'merge'
    });
  }
  viewContracts() {
    this.vw_contracts = true;
    this.vw_vendors = false;
    this.router.navigate(['/search'], {
      queryParams: { vendors: null },
      queryParamsHandling: 'merge'
    });
    this.table_scroll_set = false;
    this.initScrollBars();
  }
  buildVendorByVehicle(obj: any[]) {
    const vehicles_submitted = this.returnSubmittedVehicles();
    const results = {};
    results['vehicles'] = [];
    const vehicles: any[] = [];

    this.obligated_amounts_list = this.filtersComponent.getObligatedAmountDunsList();
    // this.agency_performance_list = this.filtersComponent.getObligatedAmountDunsList();

    for (const item of obj) {
      const vendor = {};
      const asides_arr = [];
      vendor['name'] = item.name;
      vendor['duns'] = item.duns;
      vendor['contracts'] = item.number_of_contracts;
      // vendor['tier'] = item.number_of_contracts;
      vendor['vehicles'] = this.returnVehicleVendors(item.pools);

      if (vehicles_submitted['selected']) {
        results['vehicles'] = this.returnVehicleValues(
          vehicles_submitted['selected']
        );
      } else {
        for (const i of item.pools) {
          if (!results['vehicles'].includes(i.pool.vehicle.id)) {
            results['vehicles'].push(i.pool.vehicle.id);
          }
        }
      }

      if (item.pools[0].setasides) {
        for (const asides of item.pools[0].setasides) {
          asides_arr.push(asides['code']);
        }
        vendor['setasides'] = asides_arr;
      } else {
        vendor['setasides'] = [];
      }
      if (
        this.obligated_amounts_list.length > 0 &&
        this.searchService.existsIn(this.obligated_amounts_list, item.duns, '')
      ) {
        vehicles.push(vendor);
      } else if (this.obligated_amounts_list.length === 0) {
        vehicles.push(vendor);
      }
    }
    results['vendors'] = vehicles;
    return results;
  }
  returnVehicleValues(obj: any[]) {
    const arr: any[] = [];
    for (const i of obj) {
      arr.push(i['value']);
    }
    return arr.sort(this.searchService.sortByNameAsc);
  }
  returnVehicleVendors(obj: any[]) {
    const vendors = [];
    for (const item of obj) {
      if (!vendors.includes(item.pool.vehicle.id)) {
        vendors.push(item.pool.vehicle.id);
      }
    }
    return vendors;
  }
  countVendorsByVehicle(vehicle: string) {
    const count = this.results.vendors.filter(
      item => item.vehicles.indexOf(vehicle) !== -1
    );
    return count.length;
  }
  getTotalVendorsMetCriteria(): number {
    let total = 0;
    for (const item of this.compare_tbl) {
      total += +item['vendors_results_total'];
    }
    return total;
  }

  // buildContractCompare() {
  //   const compare: any[] = [];
  //   this.contracts_w_no_records = [];
  //   for (const vehicle of this.results.vehicles) {
  //     const item: any[] = [];
  //     const vehicle_obj = this.filtersComponent.getVehicleData(vehicle);

  //     item['id'] = vehicle;
  //     item['vendors_total'] = 0;
  //     item['vendors_results_total'] = this.countVendorsByVehicle(vehicle);
  //     item['description'] = vehicle_obj['name'];
  //     item[
  //       'service_categories'
  //     ] = this.filtersComponent.getServiceCategoriesByVehicle(vehicle);
  //     item['capabilities'] = 0;
  //     item['naics'] = this.filtersComponent.getNaicsByVehicle(vehicle);
  //     item['pscs'] = this.filtersComponent.getPSCsByVehicle(vehicle);

  //     item['tier'] = vehicle_obj['tier']['name'];
  //     item['gsa'] = vehicle_obj['poc'];
  //     item['ordering_guide'] = vehicle_obj['ordering_guide'];
  //     compare.push(item);
  //     if (item['vendors_results_total'] === 0) {
  //       this.contracts_w_no_records.push({ name: item['description'] });
  //     }
  //   }
  //   this.compare_tbl = compare;
  //   this.total_vendors_met_criteria = this.getTotalVendorsMetCriteria();
  // }
  showVendorDetail(duns) {
    this.spinner = true;
    this.selected_duns = duns;
    this.show_vendor_details = true;
    const w = window.innerWidth;
    document.getElementById('slide-vendor').classList.remove('fadeOut');
    document.getElementById('slide-search').classList.remove('fadeIn');
    document.getElementById('slide-vendor').classList.add('fadeIn');
    document.getElementById('slide-search').classList.add('fadeOut');
    document.getElementById('slides-container').style.marginLeft = -w + 'px';
  }
  hideVendorDetail(bool) {
    this.spinner = false;
    this.show_vendor_details = false;
    document.getElementById('slide-vendor').classList.remove('fadeIn');
    document.getElementById('slide-search').classList.remove('fadeOut');
    document.getElementById('slide-vendor').classList.add('fadeOut');
    document.getElementById('slide-search').classList.add('fadeIn');
    document.getElementById('slides-container').style.marginLeft = '0px';
  }
  showServerError(error: number) {
    if (error === 1) {
      this.server_error = true;
    }
  }
  toggleTDHeights(id: string) {
    const doc = document.getElementsByClassName(id);
    for (const ele of doc) {
      ele.classList.toggle('show_all');
    }
  }
  toggleMoreInfo() {
    this.more_info = !this.more_info;
  }
  showSideNavFilters() {
    document.getElementById('filters-container').style.left = '0px';
    // document.getElementById('discovery').classList.add('push');
    document.getElementById('overlay-filter-mobile').classList.add('show');
    document.getElementById('btn-show-filters').style.display = 'none';
  }
  hideSideNavFilters() {
    document.getElementById('filters-container').style.left = '-360px';
    // document.getElementById('discovery').classList.remove('push');
    document.getElementById('overlay-filter-mobile').classList.remove('show');
    document.getElementById('btn-show-filters').style.display = 'block';
  }
  commaSeparatedList(obj: any[], key: string) {
    let items = '';
    for (const i of obj) {
      items += i[key] + ', ';
    }
    return items.slice(0, -2);
  }
  viewVehicleVendors(vehicle: string) {
    var filters = this.filters;
    this.sort_by = vehicle;
    this.viewVendors();
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
    }  
}
