
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-no-data-content',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule
],
  templateUrl: './no-data-content.component.html',
  styleUrl: './no-data-content.component.scss'
})
export class NoDataContentComponent {

  @Input() text = 'dados'
  @Input() link = '/admin'


}
