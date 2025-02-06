import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { gradeHorariosServices } from '../../../../../core/mocks/gradehorarios-services';

@Component({
  selector: 'app-home-services',
  templateUrl: './home-services.component.html',
  styleUrl: './home-services.component.scss'
})
export class HomeServicesComponent {

  public gradeHorariosServices = gradeHorariosServices

}
