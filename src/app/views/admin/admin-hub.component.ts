import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RouterEventService } from '@common/services/router.service';
import { filter } from 'rxjs';

@Component({
  selector: 'ct-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.scss'],
  imports: [RouterOutlet, RouterLink],
})
export class AdminHubComponent implements OnInit {
  router = inject(Router);
  routerEventService = inject(RouterEventService);

  routerEvent = toSignal(
    this.routerEventService.listen$().pipe(
      filter((event) => event instanceof NavigationEnd),
    ),
  );

  // route = this.activatedRouter.event

  activeTab = signal<'users' | 'cars'>('users');

  constructor() {
    effect(() => {
      const event = this.routerEvent();

      console.log('Router event:', event);
      // console.log('Router URL:', event?.url);

      if (event && event?.url) {
        const url = event.url;

        this.setActiveTab(url);
        console.log('Router event:', event);
      }
    });
  }

  ngOnInit(): void {
    const currentUrl = this.routerEventService.getCurrentUrl();
    console.log('Current URL on init:', currentUrl);
    this.setActiveTab(currentUrl);
  }

  setActiveTab(url: string) {
    if (url.includes('/users')) {
      this.activeTab.set('users');
    }

    if (url.includes('/cars')) {
      this.activeTab.set('cars');
    }
  }
}
