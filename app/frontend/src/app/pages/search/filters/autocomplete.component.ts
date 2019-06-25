import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
declare const $: any;
@Component({
  selector: 'discovery-autocomplete',
  templateUrl: './autocomplete.component.html',
  styles: []
})
export class AutocompleteComponent implements OnChanges {
  @Input()
  id: string;
  @Input()
  keywords_results: any[];
  @Input()
  placeholder = '';
  @Input()
  width = '225px';
  @Output()
  emitCode: EventEmitter<string> = new EventEmitter();
  keywords = '';
  constructor() {}
  ngOnChanges() {
    if (this.keywords_results && this.keywords_results.length > 0) {
      this.setKeywordAutoComplete(this.keywords_results, this.id);
    }
  }
  ngOnInit(): void {
    var self = this;
    $(function() {
      $('#' + self.id + '-autocomplete .autocomplete-drop').on('change', function(){
        self.addKeywords();
      }); 
    }); 
}
  addKeywords() {
    const code = $('#' + this.id + '-input').val();
    if (code !== null) {
      this.emitCode.emit(code);
    }
  }
  setKeywordAutoComplete(data, id) {
    $('#' + id + '-input')
      .children('option:not(:first)')
      .remove();
    $('#' + id + '-autocomplete .autocomplete-drop').select2({
      data: data,
      selectOnClose: true
    });
  }
}
