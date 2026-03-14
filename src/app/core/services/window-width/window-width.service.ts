import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject,fromEvent } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowWidthService {
  private windowWidth$: Observable<number>;
  private isMobileSubject: BehaviorSubject<boolean>;

  constructor() {
      this.windowWidth$ = fromEvent(window, 'resize').pipe(
        map(event => (event.target as Window).innerWidth),
        startWith(window.innerWidth),
        distinctUntilChanged()
      );

      this.isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth <= 600);

      this.windowWidth$.subscribe(width => {
        this.isMobileSubject.next(width <= 600);
      });

  }

  getWindowWidth(): Observable<number> {
    return this.windowWidth$;
  }

  isMobile(): Observable<boolean> {
    return this.isMobileSubject.asObservable();
  }
}
