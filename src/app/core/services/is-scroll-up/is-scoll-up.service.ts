import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsScollUpService {
  private scrolledUp = new BehaviorSubject<boolean>(false);
  private lastScrollTop = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.detectScrollDirection.bind(this));
    }
  }

  get isScrolledUp(): boolean {
    return this.scrolledUp.value;
  }

  private detectScrollDirection(): void {
    const st = document.documentElement.scrollTop;
    if (st < this.lastScrollTop) {
      this.scrolledUp.next(true);
    } else {
      this.scrolledUp.next(false);
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }
}