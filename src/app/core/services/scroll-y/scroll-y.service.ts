import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent, map, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollYService {
  private scrollYSource = new BehaviorSubject<number>(0);
  public scrollY$ = this.scrollYSource.asObservable();
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll')
        .pipe(
          throttleTime(50),
          map(() => window.scrollY)
        )
        .subscribe(scrollPosition => {
          this.scrollYSource.next(scrollPosition);
        });
    }
  }
}