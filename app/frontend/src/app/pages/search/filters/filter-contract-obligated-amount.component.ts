import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { FilterSelectedComponent } from './filter-selected.component';
declare let document: any;

@Component({
  selector: 'discovery-filter-contract-obligated-amount',
  templateUrl: './filter-contract-obligated-amount.component.html',
  styles: [
    `
      .tooltip .tooltiptext {
        width: 200px;
        margin-left: -100px;
      }
    `
  ]
})
export class FilterContractObligatedAmountComponent implements OnInit {
  @ViewChild(FilterSelectedComponent)
  msgAddedItem: FilterSelectedComponent;
  min = 0;
  max = 100000000;
  items = [
    { description: 'All', id: '0', checked: true },
    { description: '$0 - $250K', id: '0-250000', checked: false },
    { description: '$250K - $1M', id: '250001-1000000', checked: false },
    { description: '$1M - $5M', id: '1000001-5000000', checked: false },
    { description: '$5M - $10M', id: '5000001-10000000', checked: false },
    { description: '$10M - $100M', id: '10000001-100000000', checked: false },
    { description: '$100M+', id: '100000001-1000000000', checked: false }
  ];
  item_selected: any[] = [];
  duns_list: any[] = [];
  @Input()
  opened = false;
  @Input()
  disable = false;
  @Output()
  emmitSelected: EventEmitter<number> = new EventEmitter();
  @Output()
  emmitLoaded: EventEmitter<string> = new EventEmitter();
  name = 'Vendor Contract Value History';
  queryName = 'obligated_amount';
  id = 'filter-obligated_amount';
  error_message;
  count = 0;
  _obligated_amount = '0';
  value_set = false;
  json_value = 'id';
  json_description = 'description';
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.initObligatedAmounts();
  }
  initObligatedAmounts() {
    /** Grab the queryparams and sets default values
     *  on inputs Ex. checked, selected, keywords, etc */
    if (this.route.snapshot.queryParamMap.has(this.queryName)) {
      this.obligated_amount = this.route.snapshot.queryParamMap.get(
        this.queryName
      );

      /** Open accordion */
      this.opened = true;
    } else {
      this.opened = false;
    }
    this.emmitLoaded.emit(this.queryName);
  }
  get obligated_amount(): string {
    return this._obligated_amount;
  }
  set obligated_amount(value: string) {
    this._obligated_amount = value;
    if (!this.value_set) {
      /** Only emit this once */
      this.emmitSelected.emit(1);
      this.value_set = true;
      this.msgAddedItem.showMsg();
    }
  }
  getObligatedAmountDuns() {
    this.duns_list = [];
    this.searchService.getObligatedAmountDuns(this.obligated_amount).subscribe(
      data => {
        this.duns_list = data['results'];
      },
      error => (this.error_message = <any>error)
    );
  }
  getDunsList(): any[] {
    let list = [];
    if (this.obligated_amount !== '0') {
      list = this.duns_list;
    }
    return list;
  }
  getSelected(selectedOnly: boolean): any[] {
    const item = [];
    // Disable return item
    // return item;
    if (selectedOnly) {
      return [{ value: this.obligated_amount }];
    }
    if (this.obligated_amount !== '0') {
      item['name'] = this.queryName;
      item['description'] = this.name;
      item['items'] = [{ value: this.obligated_amount }];
    }
    return item;
  }
  reset() {
    /** Set default values */
    this.obligated_amount = '0';
    this.value_set = false;
    this.opened = false;
  }
}
