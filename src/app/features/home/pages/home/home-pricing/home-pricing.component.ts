import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

import { gradeHorariosServices } from '../../../../../core/mocks/gradehorarios-services';


@Component({
    selector: 'app-home-pricing',
    templateUrl: './home-pricing.component.html',
    styleUrl: './home-pricing.component.scss',
    standalone: true,
    imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink
],
})
export class HomePricingComponent {
    public gradeHorariosServices = gradeHorariosServices
    
}
