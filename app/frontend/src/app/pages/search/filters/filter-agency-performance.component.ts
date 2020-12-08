import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  AfterContentInit
} from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { FilterSelectedComponent } from './filter-selected.component';
declare let document: any;
@Component({
  selector: 'discovery-filter-agency-performance',
  templateUrl: './filter-agency-performance.component.html',
  styles: [
    `
      .tooltip .tooltiptext {
        width: 200px;
        margin-left: -100px;
      }
    `
  ]
})
export class FilterAgencyPerformanceComponent
  implements OnInit, OnChanges, AfterContentInit {
  @ViewChild(FilterSelectedComponent)
  msgAddedItem: FilterSelectedComponent;
  items: any[] = [];
  items_selected: any[] = [];
  keywords_results: any[] = [];
  @Input()
  opened = false;
  @Input()
  disable = false;
  @Output()
  emmitSelected: EventEmitter<number> = new EventEmitter();
  @Output()
  emmitLoaded: EventEmitter<string> = new EventEmitter();
  name = 'Agency Performance History';
  queryName = 'agency_performance';
  id = 'filter-agency-performance';
  error_message;
  agency = '0';
  duns_list: any[] = [];

  json_value = 'code';
  json_description = 'description';
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.setKeywordsList();
  }
  ngAfterContentInit() {}
  ngOnChanges() {}
  setKeywordsList() {
    this.searchService.getAgencyPerformanceNames().subscribe(
      data => {
        this.items = data['results'];
        this.searchService.keywords = data['results'];
        this.keywords_results = this.searchService.buildKeywordsDropdown(
          this.items
        );

        /** Grab the queryparams and sets default values
         *  on inputs Ex. checked, selected, keywords, etc */
        if (this.route.snapshot.queryParamMap.has(this.queryName)) {
          const values: string[] = this.route.snapshot.queryParamMap
            .get(this.queryName)
            .split('__');
          for (const item of values) {
            this.addItem(item);
          }
          /** Open accordion */
          this.opened = true;
        } else {
          this.opened = false;
        }
        this.emmitLoaded.emit(this.queryName);
      },
      error => {
        this.error_message = <any>error;
      }
    );
  }
  getSelected(selectedOnly: boolean): any[] {
    const item = [];
    // Disable return item
    return item;
    // if (selectedOnly) {
    //   return this.items_selected;
    // }
    // if (this.items_selected.length > 0) {
    //   item['name'] = this.queryName;
    //   item['description'] = this.name;
    //   item['items'] = this.items_selected;
    // }
    // return item;
  }
  reset() {
    this.items_selected = [];
    this.opened = false;
  }

  getItemDescription(id: string): string {
    if (id) {
      for (let i = 0; i < this.keywords_results.length; i++) {
        if (this.keywords_results[i]['id'] === id) {
          return this.keywords_results[i]['text'];
        }
      }
    }
  }
  addKeywords(code) {
    if (code === '0') {
      this.reset();
      return;
    }
    if (!this.searchService.existsIn(this.items_selected, code, 'value')) {
      this.addItem(code);
    }
  }
  addItem(id: string) {
    const item = {};
    if (id && id !== '') {
      item['value'] = id;
      item['description'] = this.getItemDescription(id);
      this.items_selected.push(item);
    }

    this.emmitSelected.emit(1);
    this.msgAddedItem.showMsg();
  }
  removeItem(key: string) {
    for (let i = 0; i < this.items_selected.length; i++) {
      if (this.items_selected[i]['value'] === key) {
        this.items_selected.splice(i, 1);
      }
    }
    this.emmitSelected.emit(0);
  }
}
