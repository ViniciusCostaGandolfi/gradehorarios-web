import { Injectable } from '@angular/core';
import { Address } from '../../interfaces/address';
import { Observable, Subject } from 'rxjs';
import { GoogleMapsApiLoaderService } from '../google-maps-api-loader/google-maps-api-loader.service';



@Injectable({
  providedIn: 'root'
})
export class AddressAutocompleteGoogleMapsService {
  [x: string]: any;

  private addressSubject = new Subject<Address>();
  public addressChanged$: Observable<Address> = this.addressSubject.asObservable();
  private autocomplete!: google.maps.places.Autocomplete;
 
  constructor(private googleMapsApiLoader: GoogleMapsApiLoaderService) { }

  public initializeAutocomplete(element: HTMLInputElement): void {
    this.googleMapsApiLoader.loadApi().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(element, {
        types: ['address'], 
        componentRestrictions: { country: 'br' }
      });

      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        const address = this.convertPlaceToAddress(place);
        this.addressSubject.next(address);
      });
    }).catch(error => console.error("Error loading Google Maps API", error));
  }

  private convertPlaceToAddress(place: google.maps.places.PlaceResult): Address {
    return {
      id: null,
      streetName: place.address_components?.find((comp: google.maps.GeocoderAddressComponent) => comp.types.includes('route'))?.long_name || '',
      streetNumber: place.address_components?.find((comp: google.maps.GeocoderAddressComponent) => comp.types.includes('street_number'))?.long_name || '',
      city: place.address_components?.find((comp: google.maps.GeocoderAddressComponent) => comp.types.includes('administrative_area_level_2'))?.long_name || '',
      neighborhood: place.address_components?.find((comp: google.maps.GeocoderAddressComponent) =>
        ["sublocality_level_1", "sublocality", "political"].some(type => comp.types.includes(type))
      )?.long_name || '',
      state: place.address_components?.find((comp: google.maps.GeocoderAddressComponent) => comp.types.includes('administrative_area_level_1'))?.short_name || '',
      country: place.address_components?.find((comp: google.maps.GeocoderAddressComponent) => comp.types.includes('country'))?.short_name || '',
      postalCode: place.address_components?.find((comp: google.maps.GeocoderAddressComponent) => comp.types.includes('postal_code'))?.long_name || '',
      formattedAddress: place.formatted_address || '',
      complement: '',
      latitude: place.geometry?.location?.lat() || 0,
      longitude: place.geometry?.location?.lng() || 0,
    }; 
  }
} 
