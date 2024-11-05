import { TestBed } from '@angular/core/testing';

import { FormRoutineTestService } from './routine-test.service';

describe('FormRoutineTestService', () => {
  let service: FormRoutineTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormRoutineTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
