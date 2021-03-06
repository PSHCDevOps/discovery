import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { SearchService } from './search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IfStmt } from '@angular/compiler';
declare const window: any;
declare let API_HOST: string;
@Component({
  selector: 'discovery-tbl-vendors',
  templateUrl: './tbl-vendors.component.html',
  styleUrls: ['./tbl-vendors.component.css']
})
export class TblVendorsComponent implements OnInit, OnChanges {
  @Input()
  vehicle = '';
  @Input()
  obligated_amounts_list: any[] = [];
  @Input()
  agency_performance_list: any[] = [];
  @Input()
  total_vendors: number;
  @Input()
  selected_vehicle: string;
  @Input()
  isVehiclechanged: number;
  @Input()
  service_categories_selected: any[] = [];
  @Input()
  params: string;
  @Output()
  emitActivateSpinner: EventEmitter<boolean> = new EventEmitter();
  @Output()
  emitVehicle: EventEmitter<string> = new EventEmitter();
  @Output()
  emitDuns: EventEmitter<string> = new EventEmitter();
  @Output()
  emitNoResults: EventEmitter<boolean> = new EventEmitter();
  sbd_col = false;
  items_per_page = 50;
  items_total: number;
  num_total_pages: number;
  num_results: number;
  current_page = 1;
  set_asides;
  vehicles_selected;
  vehicles_radios;
  vehicles;
  results;
  vendors;
  contract_urls:any;
  calc_url:string =this.getCalcAPIURL();
  error_message;
  next: number;
  prev: number;
  enable_paging = false;
  vendors_results;
  vendors_no_results = false;
  show_results = false;
  contracts_w_no_records;
  filters;
  loading = true;
  isHideEligibleServiceCategory = false;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.vehicle) {
      this.current_page = 1;
      this.filters = this.setOnlyVehicleSelected(this.vehicle);
      this.getVendors(this.current_page);
    }
    if(this.selected_vehicle != "" && this.isVehiclechanged == 1) {
       if(this.params.indexOf('vehicles=') != -1){
        let param_arr = this.params.split('&');
        let i = 0;
        for(i=0;i<param_arr.length;i++){
          if(param_arr[i].indexOf('vehicles=') != -1){ //changing previous/existing vehicle alone
           let vehicle_index = param_arr[i].indexOf('vehicles=');
           param_arr[i] = param_arr[i].replace(param_arr[i].substring(vehicle_index+9), this.selected_vehicle);
          }
        }
        this.params = param_arr.join('&');
       }else{ //adding vehicle as new property
        this.params += "&vehicles="+this.selected_vehicle;
       }
    }
  }
  getCalcAPIURL(){
    let calcurl = ""
    if(API_HOST.indexOf('discovery.gsa.gov') !== -1) {
      console.log('making calc prod url to get file');
      calcurl = "https://calc.gsa.gov/api/";
    } else if(API_HOST.indexOf('localhost') !== -1) {
      console.log('making calc  dev url to get file');
      calcurl = "https://calc-dev.app.cloud.gov/api/";
    } else {
      console.log('making calc  dev url to get file');
      calcurl = "https://calc-dev.app.cloud.gov/api/";
    }
    return calcurl;
}
  showSpinner(bool: boolean) {
    setTimeout(() => {
      this.emitActivateSpinner.emit(bool);
    });
  }
  setOnlyVehicleSelected(vehicle: string) {
    const filters = [];
    for (const filter of this.searchService.activeFilters) {
      if (filter.name === 'vehicles') {
        const item = {};
        item['description'] = 'Contract Vehicles';
        item['name'] = 'vehicles';
        item['selected'] = [{ value: vehicle }];
        filters.push(item);
      } else {
        filters.push(filter);
      }
      if (filter.name === 'pscs' || filter.name === 'naics') {
         this.isHideEligibleServiceCategory = true;
      }
    }
    return filters;
  }

  getCategories(selectedCategories) {
    let categories = {};
    for (const category of selectedCategories) {
      categories[category.value] = category.description;
    }
    return categories;
  }
 
  poolMeetCriteria(pools: any[]): string {
    const categories = [];
    let str = '';
    let vehicles = this.searchService.getServiceCategoryFilterByVehicle(this.vehicle);
    let selectedCategories = this.getCategories(this.service_categories_selected);

    for (const pool of pools) {
      for (const vehicle of vehicles) {
        let serviceCategory = selectedCategories[vehicle];
        if (pool === vehicle) {
          if (
            !this.searchService.existsIn(categories, serviceCategory, '')
          && serviceCategory != undefined) {
            categories.push(serviceCategory);
          }
        }
      }
    }
    if (categories.length > 0) {
      str = '<ul class="ul-comma-separated">';
      for (const cat of categories) {
        str += '<li>' + cat + '</li>';
      }
      str += '</ul>';
    }
    if(str.length > 0) {
      this.isHideEligibleServiceCategory = false;
    } else {
      this.isHideEligibleServiceCategory = true;
    }
    return str;
  }
  getVendors(page) {
    this.loading = true;
    this.showSpinner(true);
    let page_path = '';
    if (page > 1) {
      page_path = '&page=' + page;
    }
    this.current_page = +page;
    this.enable_paging = false;
    this.searchService
      .getVendors(this.filters, page_path, this.vehicle)
      .subscribe(
        data => {
          if (this.total_vendors === 0 || data['count'] === 0) {
            this.emitNoResults.emit(true);
            this.loading = false;
            this.enable_paging = false;
            this.results = [];
            this.vendors = [];
            return;
          }
          this.items_total = data['count'];
          this.num_results = data['results'].length;
          this.num_total_pages = Math.floor(
            (this.items_total + this.items_per_page - 1) / this.items_per_page
          );

          this.items_total = data['count'];
          this.results = data;
          this.vendors = this.buildVendorByVehicle(data['results']);
          
          let pids=[];
          for(let j=0;j<data['results'].length;j++){
            for(let i=0;i<data['results'][j].pools.length;i++){
              pids.push(data['results'][j].pools[i].piid);
            }
          }
          var pidsunique = pids.filter((v, i, a) => a.indexOf(v) === i);
          var contract_numbers = pidsunique.join();
          

          this.searchService.getCapabilityStatementLink(contract_numbers).subscribe(
            data => {
              this.contract_urls = data;              
            },
            error => (this.error_message = <any>error)
            );

            


          this.vendors_no_results = false;
          this.show_results = true;
          this.loading = false;
          this.showSpinner(false);

          this.setPreviousNext();
          this.enable_paging = true;
          window.scroll({
            top: 90,
            left: 0,
            behavior: 'smooth'
          });
          if (this.route.snapshot.queryParamMap.has('duns')) {
            this.showVendorDetails(
              this.route.snapshot.queryParamMap.get('duns')
            );
          }
        },
        error => (this.error_message = <any>error)
      );
  }

  setPreviousNext() {
    if (this.results['next'] !== null) {
      const str = this.results['next'];
      this.next = this.searchService.getPageNumber(str);
    }
    if (this.results['previous'] !== null) {
      const str = this.results['previous'];
      if (str.indexOf('&page=') !== -1) {
        this.prev = this.searchService.getPageNumber(str);
      } else {
        this.prev = 1;
      }
    }
  }
  hideLoader() {
    setTimeout(() => {
      if(/*@cc_on!@*/false || !!document.DOCUMENT_NODE){
        let loaderElemenet,loaderElemenetClasses:any;
        loaderElemenet = document.getElementsByClassName('overlay');
        loaderElemenetClasses = loaderElemenet[0].classList
        if(loaderElemenetClasses.contains('show') != -1){
          loaderElemenet[0].classList.remove('show');
          loaderElemenet[0].classList.add('hide');
        }
      }
    }, 5000);
  }
  showVendorDetails(duns: string) {
    this.router.navigate(['/search'], {
      queryParams: { duns: duns },
      queryParamsHandling: 'merge'
    });
    this.hideLoader(); 
    this.emitDuns.emit(duns);
  }

  checkAvailabilityForContract(duns: string) {
    return false
  }
  
  prevPage() {
    this.getVendors(this.prev);
  }
  nextPage() {
    this.getVendors(this.next);
  }
  getRowNum(n: number) {
    return (
      n + this.current_page * this.items_per_page - (this.items_per_page - 1)
    );
  }
  filterResultsByVehicle(vehicle: string) {
    return this.results.vendors.filter(
      vendor => vendor.vehicles.indexOf(vehicle) !== -1
    );
  }
  toggleSBD() {
    this.sbd_col = !this.sbd_col;
  }
  /** Checks if vehicles were submitted  */
  returnSubmittedVehicles(): any[] {
    for (const item of this.filters) {
      if (item.name === 'vehicles') {
        return item;
      }
    }
    return [];
  }

  buildVendorByVehicle(obj: any[]) {
    const vehicles_submitted = this.returnSubmittedVehicles();
    const results = {};
    results['vehicles'] = [];
    const vehicles: any[] = [];
    for (const item of obj) {
      const vendor = {};
      const each_contractnumber = [];
      const pools_ids_arr = [];
      vendor['name'] = item.name;
      vendor['duns'] = item.duns;
      vendor['contracts'] = item.number_of_contracts;
      vendor['vehicles'] = this.returnVehicleVendors(item.pools);
     
      for (const p_iids of item.pools) {
        each_contractnumber.push( p_iids.piid )
      }
      var contract_numbers_unique = each_contractnumber.filter((v, i, a) => a.indexOf(v) === i);
      vendor['contractnumber'] = contract_numbers_unique

      if (vehicles_submitted['selected']) {
        results['vehicles'] = this.returnVehicleValues(
          vehicles_submitted['selected']
        );
      } else {
        for (const i of item.pools) {
          var position = results['vehicles'].indexOf(i.pool.vehicle.id);
          if (position === -1) {
            results['vehicles'].push(i.pool.vehicle.id);
          }
        }
      }
      vendor['setasides'] = [];
      vendor['setasidesByPool'] = {};
      for (const pool of item.pools) {
        if(!vendor['setasidesByPool'][pool.pool.id]) {
          vendor['setasidesByPool'][pool.pool.id] = [];
        }
        pools_ids_arr.push(pool.pool.id);
        for (const aside of pool.setasides) {
        
          if (
            !this.searchService.existsIn(
              vendor['setasides'],
              aside['code'],
              ''
            ) &&
            this.vehicle === pool.pool.vehicle.id
          ) {
            vendor['setasides'].push(aside['code']);
          }
          if (
            !this.searchService.existsIn(
              vendor['setasidesByPool'][pool.pool.id],
              aside['code'],
              ''
            ) &&
            this.vehicle === pool.pool.vehicle.id
          ) {
            vendor['setasidesByPool'][pool.pool.id].push(aside['code']);
          }
        }
      }
      vendor['pools_ids'] = pools_ids_arr;

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

  countVendorsByVehicle(vehicle: string) {
    const count = this.results.vendors.filter(
      item => item.vehicles.indexOf(vehicle) !== -1
    );
    return count.length;
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
      var position = vendors.indexOf(item.pool.vehicle.id);
      if (position === -1) {
        vendors.push(item.pool.vehicle.id);
      }
    }
    return vendors;
  }

  getViewingItems(): string {
    const start = this.getRowNum(this.current_page) - this.current_page;
    const end = start + this.num_results - 1;
    return start + ' - ' + end;
  }

  isExist(arr: any, code: string): boolean {
    if (arr.length > 0) {
      return (arr.indexOf(code) >= 0) ? true : false;
    } else {
      return false;
    }
  }
  returnSetAside(item: any, code: string): boolean {
    if(this.service_categories_selected.length === 0) {
      return this.isExist(item.setasides, code);
    } else if(this.service_categories_selected.length === 1) {
      const setAsides = item.setasidesByPool[this.service_categories_selected[0].value];
      return this.isExist(setAsides, code);
    } else {
      for(const serviceCategory of this.service_categories_selected) {
        const setAsides = item.setasidesByPool[serviceCategory.value];
        if(setAsides && this.isExist(setAsides, code)) {
          return true;
        }
      }
      return false;
    }
  }
}
