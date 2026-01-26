import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule, NavigationEnd } from '@angular/router'; // Importe Router e NavigationEnd
import { CommonModule } from "@angular/common";
import { ScrollService } from '../../../core/services/scroll-to/scroll.service';
import { map, filter } from 'rxjs';
import { ScrollYService } from '../../../core/services/scroll-y/scroll-y.service';
import { mockDefaultRoutes, mockLoginRegister } from '../../../core/mocks/default-routes';
import { MatDividerModule } from "@angular/material/divider";

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
  public isHome = true; // Nova propriedade para controlar a rota

  constructor(
    private scrollService: ScrollService, 
    public scrollYservice: ScrollYService,
    private router: Router // Injeção do Router
  ) {}

  ngOnInit() {
    // Monitora o Scroll
    this.scrollYservice.scrollY$
      .pipe(map(scrollY => scrollY > 50))
      .subscribe(hasScrolled => {
        this.hasScrolled = hasScrolled;
      });

    // Monitora a Rota (URL)
    this.checkUrl(); // Checa na inicialização
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkUrl();
    });
  }

  private checkUrl() {
    // Considera Home apenas se for a raiz exata
    this.isHome = this.router.url === '/' || this.router.url.startsWith('/#');
  }

  scrollToId(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}