import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild
} from '@angular/core';
import { SearchService } from './search.service';
import { FilterContractVehiclesComponent } from './filters/filter-contract-vehicles.component';
import { FilterSbdComponent } from './filters/filter-sbd.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterKeywordsComponent } from './filters/filter-keywords.component';
import { FilterNaicsComponent } from './filters/filter-naics.component';
import { FilterServiceCategoriesComponent } from './filters/filter-service-categories.component';
import { FilterCertificationsComponent } from './filters/filter-certifications.component';
import { FilterContractPricingTypeComponent } from './filters/filter-contract-pricing-type.component';
import { FilterContractObligatedAmountComponent } from './filters/filter-contract-obligated-amount.component';
import { FilterAgencyPerformanceComponent } from './filters/filter-agency-performance.component';
import { FilterPscComponent } from './filters/filter-psc.component';
import { FilterZoneComponent } from './filters/filter-zone.component';
import { FilterPlaceOfPerformanceComponent } from './filters/filter-place-of-performance.component';

@Component({
  selector: 'discovery-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  /** START Define filter components */
  @ViewChild(FilterContractVehiclesComponent)
  filterContractVehiclesComponent: FilterContractVehiclesComponent;
  @ViewChild(FilterSbdComponent)
  filterSbdComponent: FilterSbdComponent;
  @ViewChild(FilterKeywordsComponent)
  filterKeywordsComponent: FilterKeywordsComponent;
  @ViewChild(FilterNaicsComponent)
  filterNaicsComponent: FilterNaicsComponent;
  @ViewChild(FilterServiceCategoriesComponent)
  filterServiceCategories: FilterServiceCategoriesComponent;
  @ViewChild(FilterCertificationsComponent)
  filterCertifications: FilterCertificationsComponent;
  @ViewChild(FilterContractPricingTypeComponent)
  filterContractPricing: FilterContractPricingTypeComponent;
  @ViewChild(FilterContractObligatedAmountComponent)
  filterContractObligated: FilterContractObligatedAmountComponent;
  @ViewChild(FilterAgencyPerformanceComponent)
  filterAgencyPerformance: FilterAgencyPerformanceComponent;
  @ViewChild(FilterPscComponent)
  filterPscComponent: FilterPscComponent;
  @ViewChild(FilterZoneComponent)
  filterZoneComponent: FilterZoneComponent;
  @ViewChild(FilterPlaceOfPerformanceComponent)
  filterPoP: FilterPlaceOfPerformanceComponent;
  filters_list: any[];
  /** END Define filter components */
  @Input()
  parentSpinner: boolean;
  @Output()
  emmitFilters: EventEmitter<any> = new EventEmitter();
  @Output()
  emmitResetFilters: EventEmitter<any> = new EventEmitter();
  @Output()
  emitHideFilters: EventEmitter<number> = new EventEmitter();
  @Output()
  emitServerError: EventEmitter<number> = new EventEmitter();
  @Output()
  emitReset: EventEmitter<boolean> = new EventEmitter();
  APP_ASSETS = '/';
  disabled_btn = true;
  num_items_selected = 0;
  loaded_filters: any[] = [];
  error_message;
  server_error = false;
  filters_submitted: any[];
  params_submitted = false;
  sharedFiltersLoaded = false;
  vehicles: any[] = [];
  pools: any[] = [];
  spinner = true;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    /** Set filters that will return selected items */
    this.filters_list = [
      this.filterKeywordsComponent,
      this.filterContractVehiclesComponent,
      this.filterSbdComponent,
      this.filterServiceCategories,
      this.filterNaicsComponent,
      this.filterPscComponent,
      this.filterZoneComponent
    ];
    /**
      this.filterContractObligated,
      this.filterPoP,
      this.filterAgencyPerformance

       */

    this.initPools(['All']);
  }
  initPools(vehicles) {
    this.server_error = false;
    this.searchService.getPools(vehicles).subscribe(
      data => {
        this.pools = data['results'];
        this.searchService.pools = this.pools;
        this.initVehicles();
      },
      error => {
        this.server_error = true;
        this.error_message = <any>error;
        this.emitServerError.emit(1);
        this.spinner = false;
      }
    );
  }
  initVehicles() {
    this.server_error = false;
    this.searchService.getContractVehicles().subscribe(
      data => {
        this.vehicles = data['results'];
        const queryName = 'vehicles';
        /** Grab the queryparams and sets default values
         *  on inputs Ex. checked, selected, keywords, etc */
        if (this.route.snapshot.queryParamMap.has(queryName)) {
          const values: string[] = this.route.snapshot.queryParamMap
            .get(queryName)
            .split('__');

          for (let i = 0; i < this.vehicles.length; i++) {
            if (values.indexOf(this.vehicles[i]['id']) !== -1) {
              this.vehicles[i]['checked'] = true;
              this.filterContractVehiclesComponent.addItem(
                this.vehicles[i]['id'],
                this.vehicles[i]['name']
              );
            }
          }
          /** Open accordion */
          this.filterContractVehiclesComponent.opened = true;
        }
        this.spinner = false;
        this.filterContractVehiclesComponent.loaded();
      },
      error => {
        this.server_error = true;
        this.error_message = <any>error;
        this.emitServerError.emit(1);
        this.spinner = false;
      }
    );
  }

  resetFilters() {
    for (let i = 0; i < this.filters_list.length; i++) {
      if (this.filters_list[i]) {
        this.filters_list[i].reset();
      }
    }
    this.router.navigate(['search']);
    this.num_items_selected = 0;
    this.disabled_btn = true;
    this.emitReset.emit(true);
  }
  activateSubmit(n: number): void {
    if (n === 1) {
      this.num_items_selected++;
    } else {
      this.num_items_selected--;
    }
    if (this.num_items_selected > 0) {
      this.disabled_btn = false;
    } else {
      this.disabled_btn = true;
    }
  }
  getSelectedFilters() {
    const filters: any[] = [];
    for (let i = 0; i < this.filters_list.length; i++) {
      if (this.filters_list[i]) {
        const filter_items = this.filters_list[i].getSelected(false);
        if (filter_items['name']) {
          const item = {
            name: filter_items['name'],
            description: filter_items['description'],
            selected: filter_items['items']
          };
          filters.push(item);
        }
      }
    }
    return filters;
  }
  emmitSelectedFilters(event) {
    const filters: any[] = this.getSelectedFilters();
    if (event !== null || filters.length === 0) {
      /** Clear duns */
      this.router.navigate(['/search'], {
        queryParams: { vendors: null, duns: null },
        queryParamsHandling: 'merge'
      });
    }
    this.params_submitted = true;
    this.emmitFilters.emit(filters);
    this.hideFilters();
  }
  filterOthersByVehicles(vehicles: any[]) {
    let arr = [];
    let vehicleDiscriptions = [];
    if (vehicles[0] === 'All') {
      arr = vehicles;
    } else {
      for (const i of vehicles) {
        arr.push(i.value);
        vehicleDiscriptions.push(i.description);
      }
    }
    this.filterSbdComponent.enableOrDisableFilter(vehicleDiscriptions);
    this.filterServiceCategories.setFilteredItems(arr);
    this.filterNaicsComponent.setFilteredItems(arr);
    this.filterPscComponent.setFilteredItems(arr);
    this.filterKeywordsComponent.setFilteredItems(arr);
  }
  getVehcileDescriptions() {
    let vehicles = this.filterServiceCategories.getSelectedVehcileNames();
    let vehicleDesciprtions = [];
    for(let vehicle of vehicles) {
      vehicleDesciprtions.push(this.filterContractVehiclesComponent.getItemDescription(vehicle));
    }
    return vehicleDesciprtions;
  }
  selectContractVehicleInFilter(vehicle: string) {
    this.filterContractVehiclesComponent.selectItem(vehicle);
    this.filterSbdComponent.enableOrDisableFilter(this.getVehcileDescriptions());
  }
  enableOrDisableSmallBusiness(vehciles: any) {
    if(vehciles.length > 0) {
      this.filterSbdComponent.enableOrDisableFilter(this.getVehcileDescriptions());
    } else {
      let vehicleItems = this.filterContractVehiclesComponent.getSelected(true);
      let vehicleDescriptions = [];
      for(let vehicle of vehicleItems) {
        vehicleDescriptions.push(this.filterContractVehiclesComponent.getItemDescription(vehicle.value));
      }
      this.filterSbdComponent.enableOrDisableFilter(vehicleDescriptions);
    }
    
  }
  removeServiceCategories(vehicle: string) {
    this.filterServiceCategories.removeItems(vehicle);
  }
  getServiceCategories() {
    const service_categories = this.filterServiceCategories.getItems();
    return service_categories;
  }
  getServiceCategoriesByVehicle(vehicle: string) {
    const obj: any[] = this.filterServiceCategories.getServiceCategoriesByVehicle(
      vehicle
    );
    return obj;
  }
  getServiceCategoriesDescription(pool: string) {
    return this.filterServiceCategories.getItemDescription(pool);
  }
  getContractVehicles() {
    return this.vehicles;
  }
  getNaicsSelected(): any[] {
    let items = [];
    if (this.filterNaicsComponent.getSelected(true).length > 0) {
      items = this.filterNaicsComponent.getSelected(true);
    }
    return items;
  }
  getPscsSelected(): any[] {
    let items = [];
    if (this.filterPscComponent.getSelected(true).length > 0) {
      items = this.filterPscComponent.getSelected(true);
    }
    return items;
  }
  getKeywordsSelected(): any[] {
    let items = [];
    if (this.filterKeywordsComponent.getSelected(true).length > 0) {
      items = this.filterKeywordsComponent.getSelected(true);
    }
    return items;
  }
  clearContractVehicles(bool: boolean) {
    if (bool) {
      if (
        this.filterKeywordsComponent.getSelected(true).length === 0 &&
        this.filterNaicsComponent.getSelected(true).length === 0 &&
        this.filterPscComponent.getSelected(true).length === 0
      ) {
        this.filterContractVehiclesComponent.reset();
      }
    }
  }
  setContractVehiclesInFilter(id: string, title: string) {
    this.filterContractVehiclesComponent.addItem(id, title);
    this.filterContractVehiclesComponent.opened = true;
  }
  filterNaicsByVehiclesInFilter(vehicles: any[]) {
    this.filterNaicsComponent.setFilteredItems(vehicles);
  }
  filterPscsByVehiclesInFilter(vehicles: any[]) {
    this.filterPscComponent.setFilteredItems(vehicles);
  }
  setPscsByServiceCategories(serviceCategories: any[]) {
    this.filterPscComponent.setPscsByServiceCategories(serviceCategories);
  }
  getPscsByServiceCategoriesAndVehicle(serviceCategories: any[], vehicleId: string) {
    return this.filterPscComponent.getPscsByServiceCategoriesAndVehicle(serviceCategories, vehicleId);
  }
  setKeywordsByServiceCategories(serviceCategories: any[]) {
    this.filterKeywordsComponent.setKeywordsByServiceCategories(serviceCategories);
  }
  filterKeywordsByVehiclesInFilter(vehicles: any[]) {
    this.filterKeywordsComponent.setFilteredItems(vehicles);
  }
  filterServiceCategoriesByVehiclesInFilter(vehicles: any[]) {
    this.filterServiceCategories.setFilteredItems(vehicles);
  }
  filterServiceCategoriesInFilter(serviceCategories: any[]) {
    this.filterServiceCategories.setFilteredItemsByServiceCategories(serviceCategories);
  }
  getSelectedServiceCategories(): any[] {
    return this.filterServiceCategories.getSelected(true);
  }
  getVehicleDescription(vehicle: string) {
    const desc = this.filterContractVehiclesComponent.getItemDescription(
      vehicle
    );
    return desc;
  }
  getNaicsByVehicle(vehicle: string) {
    const obj: any[] = this.filterNaicsComponent.getNaicsByVehicle(vehicle);
    return obj;
  }
  getObligatedAmountDunsList() {
    const obj: any[] = this.filterContractObligated.getDunsList();
    return obj;
  }
  getPSCsByVehicle(vehicle: string) {
    const obj: any[] = this.filterPscComponent.getPSCsByVehicle(vehicle);
    return obj;
  }
  setNaicsByServiceCategories(serviceCategories: any[]) {
    this.filterNaicsComponent.setNaicsByServiceCategories(serviceCategories);
  }
  getNaicsByServiceCategoriesAndVehicle(serviceCategories: any[], vehicleId: string) {
    return this.filterNaicsComponent.getNaicsByServiceCategoriesAndVehicle(serviceCategories, vehicleId);
  }
  getVehicleInfo(vehicle: string) {
    const obj: any[] = this.filterContractVehiclesComponent.getVehicleInfo(
      vehicle
    );
    return obj;
  }
  getSetAsides() {
    const setasides = this.filterSbdComponent.getItems();
    return setasides;
  }
  getZones() {
    const zones = this.filterZoneComponent.getItems();
    return zones;
  }
  getSelectedVehicles(): any[] {
    const vehicles: any[] = this.filterContractVehiclesComponent.getSelected(
      false
    );
    return vehicles;
  }
  getVehicleData(vehicle: string) {
    const obj = this.filterContractVehiclesComponent.getVehicleInfo(vehicle);
    return obj;
  }
  getResults(filter: string) {
    if (!this.searchService.existsIn(this.loaded_filters, filter, 'name')) {
      const item = {};
      item['name'] = filter;
      this.loaded_filters.push(item);
    }
    /** Filters need to be loaded before
     *  displaying compare table.
     */
    if (this.loaded_filters.length === this.filters_list.length) {
      if (
        this.num_items_selected > 0 &&
        this.route.snapshot.queryParamMap.keys.length > 0 &&
        !this.params_submitted
      ) {
        this.emmitSelectedFilters(null);
      } else if (this.route.snapshot.queryParamMap.keys.length === 1) {
        this.emmitSelectedFilters(true);
      }
    }
  }
  hideFilters() {
    this.emitHideFilters.emit(1);
  }
}
