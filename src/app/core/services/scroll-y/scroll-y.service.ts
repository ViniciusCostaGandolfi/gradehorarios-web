import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, fromEvent, map, throttleTime, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollYService {
  private scrollYSource = new BehaviorSubject<number>(0);
  public scrollY$ = this.scrollYSource.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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