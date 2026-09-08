import { CarsViewComponent } from './cars-view/cars-view.component';
import { CarViewComponent } from './car-view/car-view.component';

export const carsRoutes = [
  {
    path: '',
    component: CarsViewComponent,
  },
  {
    path: ':id',
    component: CarViewComponent,
  },
];
