import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VrpTestRoutingModule } from './vrp-test-routing.module';
import { VrpTestComponent } from './pages/vrp-test/vrp-test.component';
import { MapVrpModule } from '../map-vrp/map-vrp.module';
import { DefaultLayoutComponent } from '../../shared/default-layout/default-layout.component';
import { VrpTestFormComponent } from './pages/vrp-test/vrp-test-form/vrp-test-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddressAutocompleteGoogleMapsComponent } from '../../shared/address-autocomplete-google-maps/address-autocomplete-google-maps.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VrpTestComponent,
    VrpTestFormComponent
  ],
  imports: [
    CommonModule,
    VrpTestRoutingModule,
    MapVrpModule,
    DefaultLayoutComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    AddressAutocompleteGoogleMapsComponent,
    ReactiveFormsModule
  ],
  exports: [VrpTestFormComponent]
})
export class VrpTestModule { }
