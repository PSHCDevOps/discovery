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
import { ActivatedRoute } from '@angular/router';
import { FilterSelectedComponent } from './filter-selected.component';
declare let document: any;
declare let $: any;
@Component({
  selector: 'discovery-filter-place-of-performance',
  templateUrl: './filter-place-of-performance.component.html',
  styles: [
    `
      .usa-search .items-input {
        float: none !important;
      }
      #select_country {
        width: 100% !important;
      }
      #select_state {
        margin-top: 10px !important;
      }
      .tooltip .tooltiptext {
        width: 200px;
        margin-left: -100px;
      }
    `
  ]
})
export class FilterPlaceOfPerformanceComponent implements OnInit, OnChanges {
  @ViewChild(FilterSelectedComponent)
  msgAddedItem: FilterSelectedComponent;
  items: any[] = [];
  items_filtered: any[];
  countries: any[];
  states: any[];
  items_selected: any[] = [];
  @Input()
  opened = false;
  @Input()
  disable = false;
  @Output()
  emmitSelected: EventEmitter<number> = new EventEmitter();
  @Output()
  emmitLoaded: EventEmitter<string> = new EventEmitter();
  name = 'Place of Performance';
  queryName = 'pop';
  id = 'filter-pop';
  error_message;
  place = '0';
  ascending = true;
  json_value = 'id';
  json_description = 'name';
  country = '0';
  state = '0';
  value_set = false;
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.initPocs();
  }
  ngOnChanges() {}
  initPocs() {
    this.searchService.getPlaceOfPerformance().subscribe(
      data => {
        this.buildItems(data['results']);
        /** Grab the queryparams and sets default values
         *  on inputs Ex. checked, selected, keywords, etc */
        if (this.route.snapshot.queryParamMap.has(this.queryName)) {
          const values: string[] = this.route.snapshot.queryParamMap
            .get(this.queryName)
            .split('__');

          this.country = values[0];
          if (values[1]) {
            this.state = values[1];
          }
          this.emmitSelected.emit(1);
          /** Open accordion */
          this.opened = true;
        } else {
          this.opened = false;
        }
        this.emmitLoaded.emit(this.queryName);
      },
      error => (this.error_message = <any>error)
    );
  }
  buildItems(obj: any[]) {
    const countries = [];
    const states = [];
    for (const country of obj) {
      const item = {};
      const state = {};
      item['code'] = country['country_code'];
      item['name'] = country['country_name'];
      if (!this.searchService.existsIn(countries, item['name'], 'name')) {
        countries.push(item);
      }
      if (country['state'] !== null) {
        state['code'] = country['state'];
        if (!this.searchService.existsIn(states, country['state'], 'code')) {
          states.push(state);
        }
      }
    }
    this.countries = countries;
    this.countries.sort(this.searchService.sortByNameAsc);
    this.searchService.countries = this.countries;
    this.states = states;
    this.states.sort(this.searchService.sortByCodeAsc);
    this.searchService.states = this.states;
  }
  countryChange() {
    if (this.country !== '0') {
      if (!this.value_set) {
        this.value_set = true;
        this.emmitSelected.emit(1);
      }
    } else {
      this.emmitSelected.emit(0);
      this.value_set = false;
    }
  }

  getSelected(selectedOnly: boolean): any[] {
    const item = [];
    // Disable return item
    return item;
    // const selected = [];
    // if (this.country !== '0') {
    //   item['name'] = this.queryName;
    //   item['description'] = this.name;
    //   const country = {};
    //   country['value'] = this.country;
    //   selected.push(country);
    //   if (this.country === 'USA' && this.state !== '0') {
    //     const state = {};
    //     state['value'] = this.state;
    //     selected.push(state);
    //   }
    //   item['items'] = selected;
    // }
    // if (selectedOnly) {
    //   return selected;
    // }
    // return item;
  }
  reset() {
    this.country = '0';
    this.state = '0';
    this.opened = false;
  }
}
