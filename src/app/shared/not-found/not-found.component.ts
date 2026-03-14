import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    FooterComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  back(): void {
    window.history.back();
  }

}
