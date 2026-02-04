import { Component } from '@angular/core';
import { homePersons } from '../../../../../core/mocks/persons';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-home-about-us',
    templateUrl: './home-about-us.component.html',
    styleUrl: './home-about-us.component.scss',
    standalone: true,
    imports: [
            CommonModule,
            MatIconModule,
            MatButtonModule,
            MatCardModule
        ],
})
export class HomeAboutUsComponent {

  public homePersons = homePersons

}
