import { inject, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteHistoryService {
  private router = inject(Router);
  private history: string[] = [];

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.addToHistory(event.urlAfterRedirects);
      });
  }

  addToHistory(url: string) {
    if (this.history.length > 5) {
      this.history.shift();
    }

    this.history.push(url);
  }

  getHistory(): string[] {
    return this.history;
  }

  getPreviousUrl(): string | null {
    return this.history.length > 1 ? this.history[this.history.length - 2] : null;
  }
}
