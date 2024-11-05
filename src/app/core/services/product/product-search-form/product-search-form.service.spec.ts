import { TestBed } from '@angular/core/testing';

import { ProductSearchFormService } from './product-search-form.service';

describe('ProductSearchFormService', () => {
  let service: ProductSearchFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSearchFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
