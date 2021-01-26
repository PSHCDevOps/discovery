import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'discovery-erm',
  templateUrl: './erm.component.html',
  styles: [
    `
      .usa-hero {
        background-image: url(/frontend/assets/images/hero-generic-vehicles.jpg);
        color: #fff !important;
      }
      .usa-media_block-margin-bottom {
        margin-bottom: 3rem;
      }
    `
  ]
})
export class ErmComponent implements OnInit {
  pools: any[] = [];
  vehicle = 'ERM';
  error_message;
  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getPoolsByVehicle(this.vehicle).subscribe(
      data => {
        this.pools = data['results'];
        this.pools.sort(this.searchService.sortByNumberAsc);
      },
      error => (this.error_message = <any>error)
    );
  }
}
