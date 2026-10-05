import { Component, input, output } from '@angular/core';
import { Car } from '@common/types/car.interface';
import { User } from '@common/types/user.interface';
import { CarListComponent } from '@libs/cars/car-list/car-list.component';

@Component({
  selector: 'ct-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [CarListComponent],
})
export class UserComponent {
  // Inputs
  user = input<User | null>(null);
  isAdmin = input<boolean>(false);
  cars = input<Car[]>([]);

  // Outputs
  carSearchTextChanged = output<string>();
}
