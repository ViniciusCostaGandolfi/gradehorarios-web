import { Component } from '@angular/core';
import { gradeHorariosServices } from '../../../../../core/mocks/gradehorarios-services';

@Component({
  selector: 'app-home-go-further',
  templateUrl: './home-go-further.component.html',
  styleUrl: './home-go-further.component.scss'
})
export class HomeGoFurtherComponent {

  gradeHorariosServices = gradeHorariosServices

}
