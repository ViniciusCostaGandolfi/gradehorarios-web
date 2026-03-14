import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { gradeHorariosServices } from '../../../../../core/mocks/gradehorarios-services';


@Component({
    selector: 'app-home-go-further',
    templateUrl: './home-go-further.component.html',
    styleUrl: './home-go-further.component.scss',
    standalone: true,
    imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule
],
})
export class HomeGoFurtherComponent {

  gradeHorariosServices = gradeHorariosServices

}
