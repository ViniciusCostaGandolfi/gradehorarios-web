import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasTokenGuard } from './has-token.guard';

describe('hasTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
