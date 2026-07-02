import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@common/components/toast/toast.component';
import { ApplicationActions } from '@common/store/application/application.actions';
import { Store } from '@ngrx/store';
import { NavComponent } from './nav/nav.component';
import { NavMobileMenuComponent } from '@common/components/nav-mobile-menu/nav-mobile-menu.component';
import { selectIsLoggedIn, selectIsMobileMenuOpen } from '@common/store/application/application.selectors';

@Component({
  selector: 'ct-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [RouterOutlet, NavComponent, ToastComponent, NavMobileMenuComponent],
})
export class App implements OnInit {
  store = inject(Store);
  isMobileMenuOpen = this.store.selectSignal(selectIsMobileMenuOpen);
  isLoggedIn = this.store.selectSignal(selectIsLoggedIn);

  ngOnInit(): void {
    this.store.dispatch(ApplicationActions.init());
  }

  openMenu(): void {
    this.store.dispatch(ApplicationActions.openMobileMenu());
  }

  closeMenu(): void {
    this.store.dispatch(ApplicationActions.closeMobileMenu());
  }

  logout(): void {
    this.closeMenu();
    this.store.dispatch(ApplicationActions.logout());
  }
}
