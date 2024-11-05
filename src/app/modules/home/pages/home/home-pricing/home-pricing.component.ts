import { Component } from '@angular/core';
import { gradeHorariosAvailableServices } from '../../../../../core/mocks/rotafood-services';
import { treeMonthFree } from '../../../../../core/mocks/thee-month-free';

@Component({
  selector: 'app-home-pricing',
  templateUrl: './home-pricing.component.html',
  styleUrl: './home-pricing.component.scss'
})
export class HomePricingComponent {
    public gradeHorariosAvailableServices = gradeHorariosAvailableServices
    public treeMonthFree = treeMonthFree
}
