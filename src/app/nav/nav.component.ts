import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconComponent } from '@common/components/icon/icon.component';

@Component({
  selector: 'ct-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, IconComponent, RouterLink],
})
export class NavComponent {
  isLoggedIn = input<boolean>();
  menuOpened = output();

  openMenu(): void {
    this.menuOpened.emit();
  }
}
