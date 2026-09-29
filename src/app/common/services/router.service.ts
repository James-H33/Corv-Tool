import { inject, Injectable } from '@angular/core';
import type { Event } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { merge, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterEventService {
  private router = inject(Router);

  private routerEvents$ = this.router.events;

  events$ = new Subject<Event>();

  routeUrl$ = merge(this.listen$(), of(this.getCurrentUrl()))
    .pipe(
      map((value) => {
        return (value instanceof NavigationEnd ? value?.urlAfterRedirects : value) as string;
      }),
    );

  constructor() {
    this.routerEvents$.subscribe((event) => this.events$.next(event));
  }

  listen$(): Observable<Event> {
    return this.events$.asObservable();
  }

  getCurrentUrl(): string {
    return this.router.url;
  }
}
