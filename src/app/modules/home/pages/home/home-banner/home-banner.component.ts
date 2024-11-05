import { Component } from '@angular/core';
import { mockLoginRegister } from '../../../../../core/mocks/default-routes';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss'
})
export class HomeBannerComponent {
  public mockLoginRegister = mockLoginRegister
}
