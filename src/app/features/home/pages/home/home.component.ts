import { Component } from '@angular/core';
import { HomeAboutUsComponent } from './home-about-us/home-about-us.component';
import { HomePricingComponent } from './home-pricing/home-pricing.component';
import { HomeGoFurtherComponent } from './home-go-further/home-go-further.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { DefaultLayoutComponent } from '../../../../shared/default-layout/default-layout.component';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [DefaultLayoutComponent, HomeBannerComponent, HomeGoFurtherComponent, HomePricingComponent, HomeAboutUsComponent]
})
export class HomeComponent {

}
