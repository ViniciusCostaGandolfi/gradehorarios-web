import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'
import { RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from "@angular/common";
import { ScrollService } from '../../../core/services/scroll-to/scroll.service';
import { mockLoginRegister, mockDefaultRoutes} from '../../../core/mocks/default-routes';
import { map } from 'rxjs';
import { ScrollYService } from '../../../core/services/scroll-y/scroll-y.service';



@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [
    
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    CommonModule

  ],
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss'
})
export class DefaultHeaderComponent {

  public mockDefaultRoutes = mockDefaultRoutes

  public mockLoginRegister = mockLoginRegister

  public hasScrolled = false;

  constructor(private scrollService: ScrollService, public scrollYservice: ScrollYService) {}

  ngOnInit() {
    this.scrollYservice.scrollY$
      .pipe(map(scrollY => scrollY > 50))
      .subscribe(hasScrolled => {
        this.hasScrolled = hasScrolled;
      });
  }

  scrollToId(id: string) {
    console.log("element id : ", id);
    this.scrollService.scrollToElementById(id);
  }
}
