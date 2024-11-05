import { TestBed } from '@angular/core/testing';

import { ProductOptionGroupsService } from './product-option-groups.service';

describe('ProductOptionGroupsService', () => {
  let service: ProductOptionGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOptionGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
