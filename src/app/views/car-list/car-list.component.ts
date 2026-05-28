import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { ButtonIconDirective } from '@common/directives/button-icon/button-icon.directives';
import { InputModule } from '@common/directives/input/input.module';

@Component({
  selector: 'ct-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  imports: [InputModule, RouterLink, IconComponent, ButtonIconDirective],
})
export class CarListComponent {
  ellipsesMenuIcon = Icon.EllipsesMenu;
  galleryIcon = Icon.Gallery;
  cameraIcon = Icon.Camera;

  cars = signal([
    { make: 'Chevrolet', model: 'Corvette', year: 1966, vin: '1234567890' },
    { make: 'Chevrolet', model: 'Corvette', year: 1967, vin: '0987654321' },
    { make: 'Chevrolet', model: 'Corvette', year: 1965, vin: '1122334455' },
  ]);
}
