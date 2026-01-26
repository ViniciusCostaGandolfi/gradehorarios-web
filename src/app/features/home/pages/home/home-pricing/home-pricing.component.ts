import { Component } from '@angular/core';
import { treeMonthFree } from '../../../../../core/mocks/thee-month-free';
import { gradeHorariosServices } from '../../../../../core/mocks/gradehorarios-services';
import { MatIconButton, MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
    selector: 'app-home-pricing',
    templateUrl: './home-pricing.component.html',
    styleUrl: './home-pricing.component.scss',
    standalone: true,
    imports: [
                CommonModule,
                MatIconModule,
                MatButtonModule,
                MatCardModule
            ],
})
export class HomePricingComponent {
    public gradeHorariosServices = gradeHorariosServices
    
}
