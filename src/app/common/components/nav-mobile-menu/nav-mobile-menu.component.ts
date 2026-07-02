import { Component, input, output } from '@angular/core';
import { ButtonIconModule } from '@common/directives/button-icon/button-icon.module';
import { RouterLink } from '@angular/router';
import { Icon, IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ct-nav-mobile-menu',
  templateUrl: './nav-mobile-menu.component.html',
  styleUrls: ['./nav-mobile-menu.component.scss'],
  imports: [IconComponent, ButtonIconModule, RouterLink],
})
export class NavMobileMenuComponent {
  isMenuOpen = input<boolean>();
  loggedOut = output<void>();
  menuClosed = output<void>();
  backArrowIcon = Icon.BackArrow;

  closeMenu(): void {
    this.menuClosed.emit();
  }

  logout(): void {
    this.loggedOut.emit();
  }
}
