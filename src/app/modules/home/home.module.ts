import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DefaultLayoutComponent } from '../../shared/default-layout/default-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { HomeServicesComponent } from './pages/home/home-services/home-services.component';
import { HomePricingComponent } from './pages/home/home-pricing/home-pricing.component';
import { HomeAboutUsComponent } from './pages/home/home-about-us/home-about-us.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultFormContainerComponent } from '../../shared/default-form-container/default-form-container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterMerchantFormComponent } from './pages/register/forms/register-merchant-form/register-merchant-form.component';
import { RegisterUserFormComponent } from './pages/register/forms/register-user-form/register-user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddressAutocompleteGoogleMapsComponent } from '../../shared/address-autocomplete-google-maps/address-autocomplete-google-maps.component';
import { MatSelectModule } from '@angular/material/select';
import { HomeWhayUseComponent } from './pages/home/home-whay-use/home-whay-use.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
    HomeServicesComponent,
    HomePricingComponent,
    HomeAboutUsComponent,
    LoginComponent,
    RegisterComponent,
    RegisterMerchantFormComponent,
    HomeWhayUseComponent,
    RegisterUserFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DefaultLayoutComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MatSelectModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    DefaultFormContainerComponent,
    MatFormFieldModule,
    SpinnerButtonComponent,
    MatStepperModule,
    MatDialogModule,
    HttpClientModule,
    SpinnerButtonComponent,
    AddressAutocompleteGoogleMapsComponent
  ]
})
export class HomeModule { }
