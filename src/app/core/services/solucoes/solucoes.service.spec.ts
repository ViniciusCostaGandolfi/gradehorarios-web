import { TestBed } from '@angular/core/testing';

import { SolucoesService } from './solucoes.service';

describe('SolucoesService', () => {
  let service: SolucoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolucoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
