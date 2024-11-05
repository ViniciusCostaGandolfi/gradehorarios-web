import { TestBed } from '@angular/core/testing';

import { MyRoutesService } from './my-routes.service';

describe('MyRoutesService', () => {
  let service: MyRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
