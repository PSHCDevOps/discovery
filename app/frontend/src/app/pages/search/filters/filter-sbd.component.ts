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
  selector: 'discovery-filter-sbd',
  templateUrl: './filter-sbd.component.html'
})
export class FilterSbdComponent implements OnInit {
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
  emmitLoaded: EventEmitter<string> = new EventEmitter();
  name = 'Small Business Designation';
  queryName = 'setasides';
  id = 'filter-sbd';
  error_message;
  json_value = 'code';
  json_description = 'description';
  disable=false;
  isHidden=true;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.setInputItems();
  }
  setInputItems() {
    this.searchService.getSetAsides().subscribe(
      data => {
        this.items = data['results'];

        /** Grab the queryparams and sets default values
         *  on inputs Ex. checked, selected, keywords, etc */
        if (this.route.snapshot.queryParamMap.has(this.queryName)) {
          const values: string[] = this.route.snapshot.queryParamMap
            .get(this.queryName)
            .split('__');
          for (let i = 0; i < this.items.length; i++) {
            if (values.includes(this.items[i][this.json_value])) {
              this.items[i]['checked'] = true;
              this.addItem(
                this.items[i][this.json_value],
                this.items[i][this.json_description]
              );
            }
          }
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
  getItems() {
    return this.items;
  }
  resetSelectedItems() {
    for (let i = 0; i < this.items.length; ++i) {
      document.getElementById(
        this.id + '-' + this.items[i][this.json_value]
      ).checked = false;
    }
  }
  reset() {
    this.items_selected = [];
    this.resetSelectedItems();
    this.opened = false;
    this.disable = false;
  }
  hide() {
   document.getElementById(this.id).style.display = "none";
   document.getElementById(this.id).setAttribute('aria-expanded', 'false');
   document.getElementById('sbd-button').setAttribute('aria-expanded', 'false');
  }
  unhide() {
    document.getElementById(this.id).style.display = "block";
    document.getElementById(this.id).setAttribute('aria-expanded', 'true');
    document.getElementById('sbd-button').setAttribute('aria-expanded', 'true');
  }
  hideUnhide() {
    if(this.isHidden) {
      this.unhide();
    } else {
      this.hide();
    }
    this.isHidden = !this.isHidden;
  }
  enableOrDisableFilter(vehicles) {
    let unrestricted = false;
    let other =  false;

    for(let vehicle of vehicles) {
      if(vehicle.indexOf('Unrestricted') !== -1) {
        unrestricted = true;
      }
      else {
        other = true;
      }
    }
    if(unrestricted && !other) {
      this.resetSelectedItems();
      this.items_selected = [];
      this.disable = true; 
      this.isHidden = true;
      this.hide();
    } else {
      this.disable = false;
    }
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
