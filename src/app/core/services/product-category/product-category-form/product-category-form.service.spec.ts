import { TestBed } from '@angular/core/testing';

import { ProductCategoryFormService } from './product-category-form.service';

describe('ProductCategoryFormService', () => {
  let service: ProductCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
