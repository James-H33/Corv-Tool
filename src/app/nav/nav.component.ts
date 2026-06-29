import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@common/components/icon/icon.component';

@Component({
  selector: 'ct-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, IconComponent],
})
export class NavComponent {}
