import { TestBed } from '@angular/core/testing';

import { TimetableSolverService } from './timetable-solver.service';

describe('TimetableSolverService', () => {
  let service: TimetableSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetableSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
