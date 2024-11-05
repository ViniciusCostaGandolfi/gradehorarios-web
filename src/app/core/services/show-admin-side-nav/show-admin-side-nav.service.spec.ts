import { TestBed } from '@angular/core/testing';

import { ShowAdminSideNavService } from './show-admin-side-nav.service';

describe('ShowAdminSideNavService', () => {
  let service: ShowAdminSideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowAdminSideNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
