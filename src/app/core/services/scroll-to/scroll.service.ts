import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  scrollToElementById(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(id);
      this.scrollToElement(element);
    }
  }

  scrollToElement(element: HTMLElement | null) {
    if (isPlatformBrowser(this.platformId) && element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}