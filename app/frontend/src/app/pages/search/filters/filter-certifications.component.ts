import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { FilterSelectedComponent } from './filter-selected.component';
declare let document: any;
@Component({
  selector: 'discovery-filter-certifications',
  templateUrl: './filter-certifications.component.html',
  styles: []
})
export class FilterCertificationsComponent implements OnInit, AfterViewInit {
  @ViewChild(FilterSelectedComponent)
  msgAddedItem: FilterSelectedComponent;
  @Input()
  items: any[] = [];
  items_selected: any[] = [];
  @Input()
  opened = false;
  @Output()
  emmitSelected: EventEmitter<number> = new EventEmitter();
  @Output()
  emmitLoaded: EventEmitter<number> = new EventEmitter();
  name = 'Type of Certifications';
  queryName = 'certifications';
  id = 'filter-certifications';
  error_message;
  show_more = false;
  qty_items_to_show = 5;
  title_more = 'Show more';
  /** Sample json
  {

  }
  */
  /** Generate inputs labels & values
   *  with these
   */
  json_value = 'id';
  json_description = 'description';
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setInputItems();
  }
  ngAfterViewInit() {
    this.hideElements();
  }
  setInputItems() {
    // this.searchService.getCertifications().subscribe(
    //   data => {
    //     this.items = data['results'];
    //     this.emmitLoaded.emit(1);
    //     // for (const i of data['results']) {
    //     //   const item = {};
    //     //   item['id'] = i;
    //     //   item['description'] = i;
    //     //   this.items.push(item);
    //     // }
    //     /** Grab the queryparams and sets default values
    //      *  on inputs Ex. checked, selected, keywords, etc */
    //     if (this.route.snapshot.queryParamMap.has(this.queryName)) {
    //       const values: string[] = this.route.snapshot.queryParamMap
    //         .get(this.queryName)
    //         .split('__');
    //       for (let i = 0; i < this.items.length; i++) {
    //         if (values.includes(this.items[i][this.json_value])) {
    //           this.items[i]['checked'] = true;
    //           this.addItem(
    //             this.items[i][this.json_value],
    //             this.items[i][this.json_description]
    //           );
    //         }
    //       }
    //       /** Open accordion */
    //       this.opened = true;
    //     } else {
    //       this.opened = false;
    //     }
    //   },
    //   error => (this.error_message = <any>error)
    // );
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
  hideElements() {
    for (let i = 0; i < this.items.length; ++i) {
      if (i > this.qty_items_to_show) {
        document.getElementById('li-' + this.id + '-' + i).style.display =
          'none';
      }
    }
  }
  showElements() {
    for (let i = 0; i < this.items.length; ++i) {
      if (i >= this.qty_items_to_show) {
        document.getElementById('li-' + this.id + '-' + i).style.display =
          'block';
      }
    }
  }
  toggleMore() {
    this.show_more = !this.show_more;
    if (!this.show_more) {
      this.title_more = 'Show more';
      this.hideElements();
    } else {
      this.title_more = 'Show less';
      this.showElements();
    }
  }
  reset() {
    this.items_selected = [];
    for (let i = 0; i < this.items.length; ++i) {
      document.getElementById(this.id + '-' + i).checked = false;
    }
    this.opened = false;
  }
  addItem(key: string, title: string) {
    const item = {};
    item['description'] = title;
    item['value'] = key;
    this.items_selected.push(item);
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
  onChange(key: string, title: string, isChecked: boolean) {
    if (isChecked) {
      this.addItem(key, title);
    } else {
      this.removeItem(key);
    }
  }
}
