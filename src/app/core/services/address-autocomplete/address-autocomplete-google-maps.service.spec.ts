import { TestBed } from '@angular/core/testing';

import { AddressAutocompleteGoogleMapsService } from './address-autocomplete-google-maps.service';

describe('AddressAutocompleteGoogleMapsService', () => {
  let service: AddressAutocompleteGoogleMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressAutocompleteGoogleMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
