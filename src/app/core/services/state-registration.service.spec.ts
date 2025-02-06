import { TestBed } from '@angular/core/testing';

import { StateRegistrationService } from './state-registration.service';

describe('StateRegistrationService', () => {
  let service: StateRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
