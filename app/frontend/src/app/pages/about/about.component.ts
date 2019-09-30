import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare let API_HOST: string;
// declare let $: any;
@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  sam_load_date;
  fpds_load_date;
  loading = true;
  error_message;
  constructor(private httpClient: HttpClient) {}
  
  ngOnInit() {
    this.httpClient
      .get(API_HOST + '/api/metadata?api_key=DEMO_KEY')
      .subscribe(data => {
        this.loading = false;
        this.sam_load_date = data['sam_load_date'];
        this.fpds_load_date = data['fpds_load_date'];
      });
  }
}
