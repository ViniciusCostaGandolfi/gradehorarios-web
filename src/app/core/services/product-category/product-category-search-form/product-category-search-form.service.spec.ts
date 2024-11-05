import { TestBed } from '@angular/core/testing';

import { ProductCategorySearchFormService } from './product-category-search-form.service';

describe('ProductCategorySearchFormService', () => {
  let service: ProductCategorySearchFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategorySearchFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
