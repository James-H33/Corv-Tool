import { CarListComponent } from './car-list/car-list.component';
import { CarComponent } from './car/car.component';

export const carsRoutes = [
  {
    path: '',
    component: CarListComponent,
  },
  {
    path: ':id',
    component: CarComponent,
  },
];
