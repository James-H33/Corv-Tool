import { inject, Injectable } from '@angular/core';
import type { Event } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterEventService {
  private router = inject(Router);

  private routerEvents$ = this.router.events;

  events$ = new Subject<Event>();

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
