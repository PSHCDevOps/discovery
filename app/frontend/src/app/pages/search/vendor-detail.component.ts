import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { SearchService } from './search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TblContractHistoryComponent } from './tbl-contract-history.component';

@Component({
  selector: 'discovery-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit, OnChanges {
  @ViewChild(TblContractHistoryComponent)
  @Input()
  duns: string;
  @Input()
  contract_vehicles;
  @Input()
  service_categories;
  @Input()
  zones;
  @Output()
  emitBack: EventEmitter<boolean> = new EventEmitter();
  @Output()
  emitHideSpinner: EventEmitter<boolean> = new EventEmitter();
  tblContractHistory: TblContractHistoryComponent;
  error_message;
  vendor: any;
  piids_selected: any[] = [];
  spinner = true;
  sbd_col = true;
  more_info = false;
  contract_nums: any[] = [];
  num_show = 3;
  vw_details = false;
  vw_history = true;
  zindex = 30;
  loading = false;
  duns_number;
  constructor(private searchService: SearchService, private router: Router) {}
  ngOnInit() {}
  ngOnChanges() {
    if (this.duns && this.duns !== '') {
      this.loading = true;
      this.duns_number = this.duns;
      this.getVendorDetails(this.duns);
    }
  }
  backToSearchResults() {
    this.router.navigate(['/search'], {
      queryParams: { duns: null },
      queryParamsHandling: 'merge'
    });
    this.emitBack.emit(true);
  }
  viewDetails() {
    this.vw_details = true;
    this.vw_history = false;
  }
  viewHistory() {
    this.vw_details = false;
    this.vw_history = true;
  }
  onChange(ele) {
    if (ele.getAttribute('aria-expanded') === 'false') {
      ele.innerHTML = 'Less';
    } else {
      ele.innerHTML = 'More';
    }
  }
  showSpinner(bool: boolean) {
    this.spinner = bool;
  }
  getVendorDetails(duns) {
    this.searchService.getVendorDetails(duns).subscribe(
      data => {
        this.vendor = data;
        this.loading = false;
        this.vendor['pools'] = this.buildPoolsInfo(data);
        this.emitHideSpinner.emit(false);
      },
      error => (this.error_message = <any>error)
    );
  }
  buildItems(obj: any[]) {
    const categories = [];
    for (const category of obj) {
      const item = {};
      item['id'] = category['id'];
      item['name'] = category['name'];
      item['vehicle_id'] = category['vehicle']['id'];
      item['vehicle'] = category['vehicle']['id'].replace('_', ' ');
      categories.push(item);
    }
    return categories;
  }
  getVehicleDescription(vehicle: string) {
    return this.searchService.getItemDescription(
      this.contract_vehicles,
      vehicle,
      'id',
      'name'
    );
  }
  getServiceCategoryDescription(id: string) {
    return this.searchService.getItemDescription(
      this.service_categories,
      id,
      'id',
      'name'
    );
  }

  getContactInfo(contacts: any[]): string {
    let html = '';
    for (const item of contacts) {
      let name = '';
      let phone = '';
      let email = '';
      if (item.name) {
        name = '<strong class="db">' + item.name + '</strong>';
      }
      if (item.phones.length > 0) {
        for (const i of item.phones) {
          phone = '<span class="db">' + i.number + '</span>';
        }
      }
      if (item.emails.length > 0) {
        for (const i of item.emails) {
          email =
            '<span class="db pad-bottom"><a href="mailto:' +
            i.address +
            '">' +
            i.address +
            '</a></span>';
        }
      }
      html += name + phone + email;
    }
    return html;
  }
  getZoneStates(zone: number): string {
    let states = '';
    for (const item of this.zones) {
      if (+item.value === zone) {
        states = item.description;
      }
    }
    return states;
  }
  toggleSBD() {
    this.sbd_col = !this.sbd_col;
  }
  toggleMoreInfo() {
    this.more_info = !this.more_info;
  }
  onTop(ele) {
    this.zindex++;
    ele.style.zIndex = this.zindex;
  }

  buildPoolsInfo(data: any[]) {
    const vehicles: any[] = [];
    for (const item of data['pools']) {
      const vehicle = {};
      if (
        !this.searchService.existsIn(
          vehicles,
          item.pool.vehicle.id,
          'vehicle_id'
        )
      ) {
        vehicle['vehicle_id'] = item.pool.vehicle.id;
        vehicle['contacts'] = item.contacts;
        vehicle['piids'] = [{ piid: item.piid }];
        vehicle['piidsByContract'] = {};
        vehicle['piidsByContract'][item.piid] = [];
        vehicle['service_categories'] = [{ pool_id: item.pool.id }];
        vehicle['capability'] = item.capability_statement;
        vehicle['setasides'] = [];
        vehicle['zones'] = [];
        // vehicle['zones'] = item.zones.sort(this.searchService.sortByIdAsc);
        vehicles.push(vehicle);
      }
      for (const v of vehicles) {
        if (v.vehicle_id === item.pool.vehicle.id) {
          if(!v['piidsByContract'][item.piid]) {
            v['piidsByContract'][item.piid] = [];
          }
          if (!this.searchService.existsIn(v['piids'], item.piid, 'piid')) {
            v['piids'].push({ piid: item.piid });
          }
          if (
            !this.searchService.existsIn(
              v['service_categories'],
              item.pool.id,
              'pool_id'
            )
          ) {
            v['service_categories'].push({ pool_id: item.pool.id });
          }
          for (const aside of item.setasides) {
            if (
              !this.searchService.existsIn(v['setasides'], aside['code'], '')
            ) {
              v['setasides'].push(aside['code']);
            }
            if (
              !this.searchService.existsIn(v['piidsByContract'][item.piid], aside['code'], '')
            ) {
              v['piidsByContract'][item.piid].push(aside['code']);
            }
          }
          for (const zone of item.zones) {
            if (
              !this.searchService.existsIn(v['zones'], zone['id'], 'id') &&
              item.pool.vehicle.id === v.vehicle_id
            ) {
              v['zones'].push({ id: zone['id'] });
            }
          }
          v['zones'] = v['zones'].sort(this.searchService.sortByIdAsc);
        }
      }
    }
    return vehicles;
  }
  addItem(num: string) {
    this.piids_selected.push(num);
  }
  removeItem(num: string) {
    for (let i = 0; i < this.piids_selected.length; i++) {
      if (this.piids_selected[i] === num) {
        this.piids_selected.splice(i, 1);
      }
    }
  }
  returnSetAside(item: any, p: any, code: string): boolean {
    if (item.setasides.length > 0) {
      const arr = item.piidsByContract[p.piid]; 
      if (arr.indexOf(code) >= 0){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
