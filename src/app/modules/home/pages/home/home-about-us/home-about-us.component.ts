import { Component } from '@angular/core';
import { homePersons } from '../../../../../core/mocks/persons';

@Component({
  selector: 'app-home-about-us',
  templateUrl: './home-about-us.component.html',
  styleUrl: './home-about-us.component.scss'
})
export class HomeAboutUsComponent {

  public homePersons = homePersons

}
