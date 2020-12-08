import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild
} from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterSelectedComponent } from './filter-selected.component';
declare let document: any;
declare let autocomplete: any;
@Component({
  selector: 'discovery-filter-psc',
  templateUrl: './filter-psc.component.html',
  styles: []
})
export class FilterPscComponent implements OnInit, OnChanges {
  @ViewChild(FilterSelectedComponent)
  msgAddedItem: FilterSelectedComponent;
  @Input()
  items: any[];
  items_filtered: any[] = [];
  items_selected: any[] = [];
  keywords_results: any[] = [];
  @Input()
  opened = false;
  @Output()
  emmitSelected: EventEmitter<number> = new EventEmitter();
  @Output()
  emmitLoaded: EventEmitter<string> = new EventEmitter();
  @Output()
  emmitPSCs: EventEmitter<any> = new EventEmitter();
  @Output()
  emitClearedSelected: EventEmitter<boolean> = new EventEmitter();
  name = 'PSCs';
  queryName = 'pscs';
  id = 'filter-pscs';
  placeholder;
  error_message;
  selected = 0;

  json_value = 'id';
  json_description = 'text';
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {}
  ngOnChanges() {
    if (this.items.length > 1) {
      this.setKeywordsList();
    }
  }
  setKeywordsList() {
    this.items = this.buildPSCsItems(this.items);

    /** Grab the queryparams and sets default values
     *  on inputs Ex. checked, selected, keywords, etc */
    if (this.route.snapshot.queryParamMap.has(this.queryName)) {
      const values: string[] = this.route.snapshot.queryParamMap
        .get(this.queryName)
        .split('__');

      for (const id of values) {
        if (!this.searchService.existsIn(this.items_selected, id, 'value')) {
          this.addItem(id);
        }
      }
      /** Open accordion */
      this.opened = true;
    }
    /** Check if there are selected vehicles
     *  and sort dropdown based on vehicle id
     */
    if (this.route.snapshot.queryParamMap.has('vehicles')) {
      const values: string[] = this.route.snapshot.queryParamMap
        .get('vehicles')
        .split('__');

      this.setFilteredItems(values);
    } else {
      this.setFilteredItems(['All']);
    }

    this.placeholder = 'Enter PSC or keywords...';
    this.emmitLoaded.emit(this.queryName);
  }
  setFilteredItems(vehicles) {
    this.items_filtered =
      vehicles[0] !== 'All' ? this.filterByVehicles(vehicles) : this.returnUnique(this.items);
    this.items_filtered.sort(this.searchService.sortByIdAsc);
    this.keywords_results = this.items_filtered;
  }
  getPscsByServiceCategoriesAndVehicle(serviceCategories: any[], vehicleId: string) {
    const items = this.filterByServiceCategoriesAndVehicle(serviceCategories, vehicleId);
    items.sort(this.searchService.sortByIdAsc);
    return items;
  }
  setPscsByServiceCategories(serviceCategories: any[]) {
    this.items_filtered = this.filterByServiceCategories(serviceCategories);
    this.items_filtered.sort(this.searchService.sortByIdAsc);
    this.keywords_results = this.items_filtered;
  }
  buildPSCsItems(obj: any[]): any[] {
    const pscs = [];
    for (const pool of obj) {
      for (const psc of pool.psc) {
        const item = {};
        item['id'] = psc.code;
        item['text'] = psc.code + ' - ' + psc.description;
        item['description'] = psc.description;
        item['vehicle_id'] = pool.vehicle.id;
        item['pool_id'] = pool.id;
        pscs.push(item);
      }
    }
    pscs.sort(this.searchService.sortByIdAsc);
    return pscs;
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
  getItemId(value: string): string {
    if (value) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i][this.json_description] === value) {
          return this.items[i][this.json_value];
        }
      }
    }
  }
  getItemDescription(id: string): string {
    if (id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i][this.json_value] === id) {
          return this.items[i]['description'];
        }
      }
    }
  }
  addKeyword(item) {
    if (item === '0') {
      this.reset();
      return;
    }
    if (
      !this.searchService.existsIn(this.items_selected, item, 'value') &&
      this.searchService.existsIn(this.items_filtered, item, 'id')
    ) {
      this.addItem(item);
    }
  }
  addItem(id: string) {
    const item = {};
    this.items_selected = [];
    if (id && id !== '') {
      item['value'] = id;
      item['description'] = this.getItemDescription(id);
      item['pools_ids'] = this.getPoolsIds(id);
      this.items_selected.push(item);
    }
    this.emmitSelected.emit(1);
    // this.msgAddedItem.showMsg();
  }
  getPoolsIds(id: string): any[] {
    const ids = [];
    for (const prop of this.items) {
      if (prop.id === id) {
        ids.push(prop.pool_id);
      }
    }
    return ids;
  }
  filterByVehicles(vehicles: any[]) {
    const items: any[] = [];
    for (const item of vehicles) {
      for (const prop of this.items) {
        const arr = item.split('_');
        if (prop['vehicle_id'].indexOf(arr[0]) !== -1) {
          if (!this.searchService.existsIn(items, prop.id, 'id')) {
            items.push(prop);
          }
        }
      }
    }
    return items;
  }
  filterByServiceCategoriesAndVehicle(serviceCategories: any[], vehicleId: string) {
    const items: any[] = [];
    for (const item of serviceCategories) {
      for (const prop of this.items) {
        if (prop['pool_id'] === item.value && prop['vehicle_id'] === vehicleId) {
          if (!this.searchService.existsIn(items, prop.id, 'id')) {
            items.push(prop);
          }
        }
      }
    }
    return items;
  }
  filterByServiceCategories(serviceCategories: any[]) {
    const items: any[] = [];
    for (const item of serviceCategories) {
      for (const prop of this.items) {
        if (prop['pool_id'] === item.value) {
          if (!this.searchService.existsIn(items, prop.id, 'id')) {
            items.push(prop);
          }
        }
      }
    }
    return items;
  }
  getPSCsByVehicle(vehicle: string): any[] {
    let items: any[] = [];
    const abr = vehicle.substr(0, 3);
    items = this.items.filter(pscs => pscs.vehicle_id.indexOf(abr) !== -1);
    return items;
  }
  buildItemsByVehicle(obj: any[]) {
    const pscs = [];
    for (const pool of obj) {
      const item = {};
      item['vehicle_id'] = pool.vehicle.id;
      item['pscs'] = this.setPSCs(pool.pscs);
      if (
        !this.searchService.existsIn(pscs, pscs['vehicle_id'], 'vehicle_id')
      ) {
        pscs.push(item);
      }
    }
    return pscs;
  }
  setPSCs(obj: any[]) {
    const items: any[] = [];
    for (const i of obj) {
      const item = {};
      item['code'] = i.code;
      item['description'] = i.description;
      if (!this.searchService.existsIn(items, i.code, 'code')) {
        items.push(item);
      }
    }
    return items;
  }

  getSelected(selectedOnly: boolean): any[] {
    const item = [];
    if (selectedOnly) {
      return this.items_selected;
    }
    if (this.items_selected.length > 0) {
      item['name'] = this.queryName;
      item['description'] = this.name;
      item['items'] = this.items_selected;
    }
    return item;
  }
  reset() {
    this.items_selected = [];
    this.opened = false;
    this.selected = 0;
    this.emitClearedSelected.emit(true);
  }
  removeItem(value: string) {
    this.reset();
    // for (let i = 0; i < this.items_selected.length; i++) {
    //   if (this.items_selected[i]['value'] === value) {
    //     this.items_selected.splice(i, 1);
    //   }
    // }
    if (this.items_selected.length === 0) {
      this.emitClearedSelected.emit(true);
    }
    this.emmitSelected.emit(0);
  }
}
