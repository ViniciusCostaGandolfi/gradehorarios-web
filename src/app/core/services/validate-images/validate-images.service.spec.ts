import { TestBed } from '@angular/core/testing';

import { ValidateImagesService } from './validate-images.service';

describe('ValidateImagesService', () => {
  let service: ValidateImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
