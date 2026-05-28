import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { ButtonIconDirective } from '@common/directives/button-icon/button-icon.directives';

@Component({
  selector: 'ct-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [IconComponent, RouterLink, ButtonIconDirective],
})
export class CarComponent {
  backArrowIcon = Icon.BackArrow;

  trimTagData = signal({
    codes: {
      style: '19 437',
      trim: '414 A',
      body: 'A-2417',
      paint: 'F-F',
      date_code: 'H22',
    },
    definition: {
      style: '1965 Chevrolet Corvette Sport Coupe',
      trim: 'Bright Blue vinyl upholstery',
      body: 'A.O. Smith assembly',
      paint: 'Nassau Blue exterior paint',
      date_code: 'Built the 22nd week of 1965',
    },
  });
}
