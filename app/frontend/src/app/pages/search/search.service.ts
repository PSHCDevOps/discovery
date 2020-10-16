import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { stringify } from '@angular/compiler/src/util';
declare let API_HOST: string;
declare let SAM_API_KEY: string;
declare const $: any;
@Injectable({
  providedIn: 'root'
})
export class SearchService  {
  private apiUrl: string;
  private calcapiUrl: string;
  _pools;
  _keywords;
  _active_filters: any[];
  _contract_results: any[];
  _total_vendors_per_vehicle: any[];
  _countries: any[];
  _states: any[];

  search_options = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.setApiUrl();
    this.setCalcApiUrl();
  }

  setApiUrl() {
    this.apiUrl = this.getAPIUrl();
  }
  setCalcApiUrl() {
    this.calcapiUrl = this.getCalcAPIUrl();
  }

  getAPIUrl() {
    let apiUrl : string = '';
    if(API_HOST.indexOf('discovery.gsa.gov') !== -1) {
      apiUrl = 'https://api.gsa.gov/acquisition/discovery/v2/';
    } else if(API_HOST.indexOf('localhost') !== -1) {
      apiUrl = API_HOST + '/api/';
    } else {
      apiUrl = 'https://api.gsa.gov/acquisition/discovery/DEV/v2/';
    }
    return apiUrl;
  }

  getCalcAPIUrl() {
    let calcapiUrl : string = '';
    if(API_HOST.indexOf('discovery.gsa.gov') !== -1) {
      console.log('making calc prod url');
      calcapiUrl = "https://calc.gsa.gov/api/";
    } else if(API_HOST.indexOf('localhost') !== -1) {
      console.log('making calc  dev url');
      calcapiUrl = "https://calc-dev.app.cloud.gov/api/";
    } else {
      console.log('making calc  dev url');
      calcapiUrl = "https://calc-dev.app.cloud.gov/api/";
    }
    return calcapiUrl;
  }

  get pools(): any[] {
    return this._pools;
  }
  set pools(arr: any[]) {
    this._pools = arr;
  }
  get keywords(): any[] {
    return this._keywords;
  }
  set keywords(arr: any[]) {
    this._keywords = arr;
  }
  get total_vendors_per_vehicle(): any[] {
    return this._total_vendors_per_vehicle;
  }
  set total_vendors_per_vehicle(arr: any[]) {
    this._total_vendors_per_vehicle = arr;
  }
  get activeFilters(): any[] {
    return this._active_filters;
  }
  set activeFilters(arr: any[]) {
    this._active_filters = arr;
  }
  get contractResults(): any[] {
    return this._contract_results;
  }
  set contractResults(arr: any[]) {
    this._contract_results = arr;
  }
  get countries(): any[] {
    return this._countries;
  }
  set countries(arr: any[]) {
    this._countries = arr;
  }
  get states(): any[] {
    return this._states;
  }
  set states(arr: any[]) {
    this._states = arr;
  }
  setSearchOptions(key: string, values: any[]): void {
    this.search_options[key] = values;
  }
  getSearchOptions(key: string): string[] {
    return this.search_options[key];
  }
  getContractVehicles(): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'vehicles');
    return this.http.get<any[]>(url).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  // getCertifications(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     tap(data => data),
  //     catchError(this.handleError)
  //   );
  // }
  getPSCsByTerm(str: string): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'psc?description__contains=' + str);
    return this.http.get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getPSCsByNAICs(naics): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'psc?naics__code__in=' + this.arrToString(naics));
    return this.http
      .get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getContractPricingType(): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'contracts/values/pricing_type__name');
    return this.http.get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getSetAsides(): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl +'setasides?description');
    return this.http.get<any[]>(url).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getServiceCategories(vehicles): Observable<any[]> {
    if (vehicles[0] === 'All') {
      let url = this.getUrlWithKey(this.apiUrl + 'pools?page=0');
      return this.http.get<any[]>(url).pipe(
        tap(data => data),
        catchError(this.handleError)
      );
    } else {
      let url = this.getUrlWithKey(this.apiUrl + 'pools?vehicle__id__in=' + 
          this.arrToString(vehicles));
      return this.http
        .get<any[]>(url)
        .pipe(
          tap(data => data),
          catchError(this.handleError)
        );
    }
  }
  getPools(vehicles): Observable<any[]> {
    if (vehicles[0] === 'All') {
      let url = this.getUrlWithKey(this.apiUrl + 'pools?page=0');
      return this.http.get<any[]>(url).pipe(
        tap(data => data),
        catchError(this.handleError)
      );
    } else {
      let url = this.getUrlWithKey(this.apiUrl + 'pools?vehicle__id__in=' 
        + this.arrToString(vehicles));
      return this.http.get<any[]>(url)
        .pipe(
          tap(data => data),
          catchError(this.handleError)
        );
    }
  }

  getZone(): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'zones/?page=0');
    return this.http.get<any[]>(url).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }

  getKeywords(): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'keywords?page=0');
    return this.http.get<any[]>(url).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getPoolsByVehicle(vehicle: string): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'pools?vehicle__id=' + vehicle);
    return this.http.get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getNaics(vehicles): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'pools');
    if (vehicles[0] === 'All') {
      return this.http.get<any[]>(url).pipe(
        tap(data => data),
        catchError(this.handleError)
      );
    } else {
      let url = this.getUrlWithKey(this.apiUrl + 'pools?vehicle__id__in=' + this.arrToString(vehicles));
      return this.http
        .get<any[]>(url)
        .pipe(
          tap(data => data),
          catchError(this.handleError)
        );
    }
  }
  getNaicsCodes(vehicle): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'pools/values/naics__code?vehicle__id=' + vehicle);
    return this.http
      .get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getPlaceOfPerformance(): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'placesofperformance/?page=0');
    return this.http.get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getVendors(filters: any[], page: string, vehicle: string): Observable<any[]> {
    let params = '';
    if (vehicle) {
      params += '%28pool__vehicle__id=' + vehicle + '%29';
    }
    var selectedServiceCategory = this.getServiceCategoryFilterByVehicle(vehicle);
    params += this.buildOtherParams(filters, selectedServiceCategory);
    if (page) {
      params += page;
    }
    let url = this.getUrlWithKey(this.apiUrl + 'vendors?membership=' + params);
    console.log(url);
    return this.http.get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  buildOtherParams(filters, selectedServiceCategories: string[]): string {
    let params = '';
    for (const filter of filters) {
      if (filter['name'] === 'keywords') {
        for (const keyword of filter['selected']) {
          params += '%26%28pool__keywords__id=' + keyword['value'] + '%29';
        }
      }
      if (filter['name'] === 'service_categories') {
        if(selectedServiceCategories.length > 0) {
          params += '%26%28pool__id__in=' + selectedServiceCategories.join() + '%29';
        }
      }
      if (filter['name'] === 'setasides') {
        for (const setaside of filter['selected']) {
          params += '%26%28setasides__code=' + setaside['value'] + '%29';
        }
      }
      if (filter['name'] === 'naics') {
        for (const naic of filter['selected']) {
          params += '%26%28pool__naics__code=' + naic['value'] + '%29';
        }
      }
      if (filter['name'] === 'pscs') {
        for (const psc of filter['selected']) {
          params += '%26%28pool__psc__code=' + psc['value'] + '%29';
        }
      }
      if (filter['name'] === 'zone') {
        for (const zone of filter['selected']) {
          params += '%26%28zones__id=' + zone['value'] + '%29';
        }
      }
      if (filter['name'] === 'pop') {
        params +=
          '%26%28contract__place_of_performance__country_code=' +
          filter['selected'][0].value +
          '%29';
        if (filter['selected'][1]) {
          params +=
            '%26%28contract__place_of_performance__state=' +
            filter['selected'][1].value +
            '%29';
        }
      }
      if (filter['name'] === 'obligated_amount') {
        const threshold = filter['selected'][0].value;
        params +=
          '%26%28contract__obligated_amount__range=0,' + threshold + '%29';
      }
      if (filter['name'] === 'agency_performance') {
        for (const agency of filter['selected']) {
          params += '%26%28contract__agency__id=' + agency['value'] + '%29';
        }
      }
    }
    return params;
  }
  getUrlWithKey(url: string) {
    if(API_HOST.indexOf('localhost') !== -1) {
      return url;
    }
    if(url.indexOf('?') !== -1) {
      url = url + '&api_key=' + SAM_API_KEY;
    } else {
      url = url + '?api_key=' + SAM_API_KEY;
    }
    return url;
  }
  getVehicleVendorsMeetCriteria(
    filters: any[],
    vehicle: string,
    selectedServiceCategory: string[]
  ): Observable<any[]> {
    let params = '';
    params += '%28pool__vehicle__id=' + vehicle + '%29';
    params += this.buildOtherParams(filters, selectedServiceCategory);
    let url = this.getUrlWithKey(this.apiUrl + 'vendors/count/duns?membership=' + params);
    console.log(url);
    return this.http
      .get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  generateUniqueID(): string {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
  getVehiclesToCompare(filters: any[]): Observable<any[]> {
    let params = '';
    for (const filter of filters) {
      if (filter['name'] === 'vehicles') {
        params +=
          '&vehicle__id__in=' +
          this.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'keywords') {
        params +=
          '&keywords__id__in=' +
          this.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'naics') {
        params +=
          '&naics__code__in=' +
          this.getSelectedFilterList(filter['selected'], ',');
      }
      if (filter['name'] === 'pscs') {
        params +=
          '&psc__code__in=' +
          this.getSelectedFilterList(filter['selected'], ',');
      }
    }
    let url = this.getUrlWithKey(this.apiUrl + 'pools/values/vehicle?' + params.substr(1));
    console.log(url);
    return this.http
      .get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getVendorsCountByVehicle(vehicle: string): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'vendors/count/id?pools__pool__vehicle__id=' + vehicle);
    return this.http.get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getObligatedAmountDuns(range: string): Observable<any[]> {
    const arr = range.split('-');
    const from = arr[0];
    const to = arr[1];
    let url = this.getUrlWithKey(this.apiUrl + 
      'contracts/values/vendor__duns?obligated_amount__range=' +
      from + ',' + to);
    return this.http.get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getAgencyPerformanceNames(): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'agencies/?page=0');
    return this.http.get<any[]>(url).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getAgencyPerformanceDuns(ids: string): Observable<any[]> {
    let url = this.getUrlWithKey(this.apiUrl + 'contracts/values/vendor__duns?agency_id__in=' + ids);
    return this.http.get<any[]>(url)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getVendorDetails(duns: string): Observable<any> {
    let url = this.getUrlWithKey(this.apiUrl + 'vendors/' + duns);
    console.log(url);
    return this.http.get<any[]>(url).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getCapabilityStatementLink(contractnumber: string): Observable<any[]> {
    let url = this.calcapiUrl + 'contract/capability_statement/url/' + contractnumber;
    console.log(url);
    return this.http.get<any[]>(url).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getVendorContractHistory(
    duns: string,
    page: string,
    piid: string,
    naic: string,
    country: string,
    state: string,
    ordering: string
  ): Observable<any[]> {
    let params = 'contracts?vendor__duns=' + duns;
    if (naic !== 'All') {
      params += '&psc_naics=' + naic;
    }
    if (piid !== 'All') {
      params += '&base_piid__in=' + piid;
    }
    if (country !== '0') {
      params += '&place_of_performance__country_code=' + country;
    }
    if (state !== '0') {
      params += '&place_of_performance__state=' + state;
    }
    if (ordering !== '') {
      params += '&ordering=' + ordering;
    }
    let url = this.getUrlWithKey(this.apiUrl + params + page);
    console.log(url);
    return this.http.get<any[]>(url).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  arrToString(arr) {
    let str = '';
    for (const selected of arr) {
      str += selected + ',';
    }
    str = str.slice(0, -1);
    return str;
  }
  setQueryParams(filters: any[]): void {
    const params = this.getQueryParams(filters);
    this.router.navigate(['search'], {
      queryParams: params
    });
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occurred: ' + err.error.message;
    } else {
      errorMessage =
        'Server returned code: ' +
        err.status +
        ', error message is: ' +
        err.message;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getSelectedFilterList(arr: any[], concat: string): string {
    let str = '';
    for (const selected of arr) {
      str += selected['value'] + concat;
    }
    str = str.slice(0, -concat.length);
    return str;
  }
  getQueryParams(arr: any[]): any[] {
    const obj = [];
    for (const filter of arr) {
      obj[filter.name] = this.getSelectedFilterList(filter['selected'], '__');
    }
    return obj;
  }
  existsIn(obj: any[], value: string, key: string): boolean {
    for (let i = 0; i < obj.length; i++) {
      if (key !== '') {
        if (obj[i][key] === value) {
          return true;
        }
      } else {
        if (obj[i] === value) {
          return true;
        }
      }
    }
    return false;
  }
  get(obj: any[], value: string, key: string): any {
    if(obj) {
      for (let i = 0; i < obj.length; i++) {
        if (key !== '') {
          if (obj[i][key] === value) {
            return obj[i];
          }
        }
      } 
    }
  }
  getItemDescription(
    obj: any[],
    value: string,
    key_id: string,
    key_desc: string
  ): string {
    if (value) {
      for (let i = 0; i < obj.length; i++) {
        if (obj[i][key_id] === value) {
          return obj[i][key_desc];
        }
      }
    }
  }
  commaSeparatedList(obj: any[], key: string) {
    let items = '';
    if (key !== '') {
      for (const i of obj) {
        items += i[key] + ', ';
      }
    } else {
      for (const i of obj) {
        items += i + ', ';
      }
    }
    return items.slice(0, -2);
  }
  getPageNumber(str): number {
    const params = str.split('&');
    let n = 0;
    for (const item of params) {
      if (item.indexOf('page=') !== -1) {
        const arr = item.split('=');
        n = arr[1];
      }
    }
    return n;
  }
  buildKeywordsDropdown(pools: any[]): any[] {
    const keywords = [];
    if(pools) {
      for (let i = 0; i < pools.length; i++) {
        const pool = pools[i];
        if(pool.keywords) {
          for (let j = 0; j < pool.keywords.length; j++) {
            var item = pool.keywords[j];
            const keyword = this.get(keywords, item.id, 'id');
            if(keyword) {
              keyword['pool_id'].push(pool.id);
            } else {
              const kw = {};
              kw['text'] = item.name;
              kw['id'] = item.id;
              kw['vehicle_id'] = pool.vehicle.id;
              kw['pool_id'] = [];
              kw['pool_id'].push(pool.id);
              keywords.push(kw);
            }
          }  
        }
      }  
   }
  return keywords;
  }

  sortByNameAsc(i1, i2) {
    if (i1.name > i2.name) {
      return 1;
    } else if (i1.name === i2.name) {
      return 0;
    } else {
      return -1;
    }
  }
  sortByValueAsc(i1, i2) {
    if (i1 > i2) {
      return 1;
    } else if (i1 === i2) {
      return 0;
    } else {
      return -1;
    }
  }
  sortByIdAsc(i1, i2) {
    if (i1.id > i2.id) {
      return 1;
    } else if (i1.id === i2.id) {
      return 0;
    } else {
      return -1;
    }
  }
  sortByCodeAsc(i1, i2) {
    if (i1.code > i2.code) {
      return 1;
    } else if (i1.code === i2.code) {
      return 0;
    } else {
      return -1;
    }
  }
  sortByTextAsc(i1, i2) {
    if (i1.text > i2.text) {
      return 1;
    } else if (i1.text === i2.text) {
      return 0;
    } else {
      return -1;
    }
  }
  sortByDescriptionAsc(i1, i2) {
    if (i1.description > i2.description) {
      return 1;
    } else if (i1.description === i2.description) {
      return 0;
    } else {
      return -1;
    }
  }
  sortByVehicleAsc(i1, i2) {
    if (i1.vehicle > i2.vehicle) {
      return 1;
    } else if (i1.vehicle === i2.vehicle) {
      return 0;
    } else {
      return -1;
    }
  }
  sortByNumberAsc(i1, i2) {	
    var number1 = parseInt(i1.number, 10);	
    var number2 = parseInt(i2.number, 10);	
    if (number1 > number2) {	
      return 1;	
    } else if (number1 === number2) {	
      return 0;	
    } else {	
      return -1;	
    }	
  }
  formatServiceCategories(serviceCategories: string, poolNumber: any) {	
    return serviceCategories.replace(new RegExp('{pool_id}', 'g'), poolNumber);	
  }
   
  getServiceCategoryFilterByVehicle(vehicleId: any) {
    let smallBusinessServiceCategories:string[] = [];
    let unrestrictedServiceCategories:string[] = [];
    let isSmallBusiness = vehicleId.indexOf('SB') >= 0 ? true : false;
    for (const filter of this.activeFilters) {
      if (filter['name'] === 'service_categories') {
        for (const cat of filter['selected']) {
          if(cat.value.indexOf(vehicleId) >= 0) {
            if(cat.value.indexOf('SB') >= 0) {
              smallBusinessServiceCategories.push(cat['value']);
            } else {
              unrestrictedServiceCategories.push(cat['value']);
            }
          }
        }
      }
    }
    if(isSmallBusiness) {
      return smallBusinessServiceCategories;
    } else {
      return unrestrictedServiceCategories;
    }
  }
}
