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
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddressAutocompleteGoogleMapsComponent } from '../../shared/address-autocomplete-google-maps/address-autocomplete-google-maps.component';
import { MatSelectModule } from '@angular/material/select';
import { HomeWhayUseComponent } from './pages/home/home-whay-use/home-whay-use.component';
import { HomeSchoolTimetableComponent } from './pages/home/home-school-timetable/home-school-timetable.component';
import { HomeGoFurtherComponent } from './pages/home/home-go-further/home-go-further.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
    HomeServicesComponent,
    HomePricingComponent,
    HomeAboutUsComponent,
    LoginComponent,
    RegisterComponent,
    HomeGoFurtherComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    HomeSchoolTimetableComponent,
    HomeWhayUseComponent,
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
