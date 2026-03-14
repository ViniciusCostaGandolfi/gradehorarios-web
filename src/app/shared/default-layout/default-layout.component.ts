import { Component } from '@angular/core';

import { FooterComponent } from '../../shared/footer/footer.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    DefaultHeaderComponent,
    FooterComponent
],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

}
