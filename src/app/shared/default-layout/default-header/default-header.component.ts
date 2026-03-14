import { CommonModule } from "@angular/common";
import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd,Router, RouterModule } from '@angular/router';
import { filter,map } from 'rxjs';

import { mockDefaultRoutes, mockLoginRegister } from '../../../core/mocks/default-routes';
import { ScrollService } from '../../../core/services/scroll-to/scroll.service';
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
    CommonModule,
    MatDividerModule
  ],
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss'
})
export class DefaultHeaderComponent implements OnInit {

  public mockDefaultRoutes = mockDefaultRoutes;
  public mockLoginRegister = mockLoginRegister;

  public hasScrolled = false;
  public isHome = true;

  private scrollService = inject(ScrollService);
  public scrollYservice = inject(ScrollYService);
  private router = inject(Router);

  ngOnInit(): void {
    this.scrollYservice.scrollY$
      .pipe(map(scrollY => scrollY > 50))
      .subscribe(hasScrolled => {
        this.hasScrolled = hasScrolled;
      });

    this.checkUrl();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkUrl();
    });
  }

  private checkUrl(): void {
    this.isHome = this.router.url === '/' || this.router.url.startsWith('/#');
  }

  scrollToId(id: string): void {
    this.scrollService.scrollToElementById(id);
  }
}