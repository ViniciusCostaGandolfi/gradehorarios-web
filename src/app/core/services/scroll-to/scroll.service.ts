import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  scrollToElementById(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(id);
      this.scrollToElement(element);
    }
  }

  scrollToElement(element: HTMLElement | null): void {
    if (isPlatformBrowser(this.platformId) && element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}