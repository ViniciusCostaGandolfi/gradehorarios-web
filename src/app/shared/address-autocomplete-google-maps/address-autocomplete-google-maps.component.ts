import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AddressAutocompleteGoogleMapsService } from '../../core/services/address-autocomplete/address-autocomplete-google-maps.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Address } from '../../core/interfaces/address';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-address-autocomplete-google-maps',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './address-autocomplete-google-maps.component.html',
  styleUrls: ['./address-autocomplete-google-maps.component.scss']
})
export class AddressAutocompleteGoogleMapsComponent implements AfterViewInit {
  @ViewChild('addressInput', { static: false }) addressInput!: ElementRef;
  @Output() addressSelected = new EventEmitter<Address>();
  @Input() addressControl!: FormControl<Address | null>;

  formattedAddressControl = new FormControl<string>('')

  constructor(private addressAutocompleteService: AddressAutocompleteGoogleMapsService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
        if (this.addressControl.value !== null) {
        this.formattedAddressControl.setValue(this.addressControl.value.formattedAddress)
      }
    })
    this.formattedAddressControl.setValidators(this.addressControl.validator);
    this.addressAutocompleteService.initializeAutocomplete(this.addressInput.nativeElement);
    this.addressAutocompleteService.addressChanged$.subscribe(address => {
      if (address) {
        this.addressControl.setValue(address);
        this.formattedAddressControl.setValue(address.formattedAddress)
      }
    });
  }
}
