import { TestBed } from '@angular/core/testing';

import { CurrentlyUserService } from './currently-user.service';

describe('UserService', () => {
  let service: CurrentlyUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentlyUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
