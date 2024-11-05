import { TestBed } from '@angular/core/testing';

import { IsScollUpService } from './is-scoll-up.service';

describe('IsScollUpService', () => {
  let service: IsScollUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsScollUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
