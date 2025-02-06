import { TestBed } from '@angular/core/testing';

import { CollegesService } from './colleges.service';

describe('CollegesService', () => {
  let service: CollegesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
