import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAutocompleteGoogleMapsComponent } from './address-autocomplete-google-maps.component';

describe('AddressAutocompleteGoogleMapsComponent', () => {
  let component: AddressAutocompleteGoogleMapsComponent;
  let fixture: ComponentFixture<AddressAutocompleteGoogleMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressAutocompleteGoogleMapsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressAutocompleteGoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
