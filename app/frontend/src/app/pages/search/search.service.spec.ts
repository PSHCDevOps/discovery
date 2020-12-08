import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SearchService } from './search.service';

// use to mock filters passed into getVendor request
export const mockContractFilter = [
  {
    description: 'Contract Vehicles',
    name: 'vehicles',
    selected: [
      {
        value: 'BMO',
      },
    ],
  },
  {
    name: 'naics',
    description: 'NAICs',
    selected: [
      {
        value: '236220',
        description: 'Commercial and Institutional Building Construction',
        pools_ids: ['BMO_11', 'BMO_SB_11'],
      },
    ],
  },
];

export const mockActiveFilters = [
  {
    name: 'vehicles',
    description: 'Contract Vehicles',
    selected: [
      {
        description: 'BMO Unrestricted',
        value: 'BMO',
      },
    ],
  },
  {
    name: 'naics',
    description: 'NAICs',
    selected: [
      {
        value: '236220',
        description: 'Commercial and Institutional Building Construction',
        pools_ids: ['BMO_11', 'BMO_SB_11'],
      },
    ],
  },
];

// const url = this.getUrlWithKey(this.apiUrl + 'vendors?membership=' + params);
const vendorUrl = 'http://localhost:8080/api/vendors';

describe('SearchService', () => {
  let httpTestingController: HttpTestingController;
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SearchService);
    service.activeFilters = mockActiveFilters;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should should provide data', () => {
    service
      .getVendors(mockContractFilter, '', 'BMO')
      .subscribe((vendors: any) => {
        expect(vendors).not.toBe(null);
        expect(vendors.count).toEqual(141);
      });

    const req = httpTestingController.expectOne(
      'http://localhost:8080/api/vendors?membership=%28pool__vehicle__id=BMO%29%26%28pool__naics__code=236220%29'
    );
  });
});
