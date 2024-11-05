import { TestBed } from '@angular/core/testing';

import { RegisterUserFormService } from './register-user-form.service';

describe('RegisterUserFormService', () => {
  let service: RegisterUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterUserFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
