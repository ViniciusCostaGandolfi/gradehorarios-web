import { TestBed } from '@angular/core/testing';

import { RegisterMerchantFormService } from './register-merchant-form.service';

describe('RegisterMerchantFormService', () => {
  let service: RegisterMerchantFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterMerchantFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
