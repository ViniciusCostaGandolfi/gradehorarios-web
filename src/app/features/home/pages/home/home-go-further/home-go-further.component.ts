import { Component } from '@angular/core';
import { gradeHorariosServices } from '../../../../../core/mocks/gradehorarios-services';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-go-further',
    templateUrl: './home-go-further.component.html',
    styleUrl: './home-go-further.component.scss',
    standalone: true,
    imports: [
                CommonModule,
                MatIconModule,
                MatButtonModule,
                MatCardModule
            ],
})
export class HomeGoFurtherComponent {

  gradeHorariosServices = gradeHorariosServices

}
