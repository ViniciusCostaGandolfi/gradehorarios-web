import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { homePersons } from '../../../../../core/mocks/persons';

@Component({
    selector: 'app-home-about-us',
    templateUrl: './home-about-us.component.html',
    styleUrl: './home-about-us.component.scss',
    standalone: true,
    imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule
],
})
export class HomeAboutUsComponent {

  public homePersons = homePersons

}
