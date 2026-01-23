import { Component } from '@angular/core';
import { treeMonthFree } from '../../../../../core/mocks/thee-month-free';
import { gradeHorariosServices } from '../../../../../core/mocks/gradehorarios-services';


@Component({
  selector: 'app-home-pricing',
  templateUrl: './home-pricing.component.html',
  styleUrl: './home-pricing.component.scss'
})
export class HomePricingComponent {
    public gradeHorariosServices = gradeHorariosServices
    
}
