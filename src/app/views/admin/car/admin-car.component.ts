import { Component } from '@angular/core';
import { CarComponent } from '@libs/cars/car/car.component';

@Component({
  selector: 'ct-admin-car',
  templateUrl: './admin-car.component.html',
  styleUrls: ['./admin-car.component.scss'],
  imports: [CarComponent],
})
export class AdminCarComponent {}
