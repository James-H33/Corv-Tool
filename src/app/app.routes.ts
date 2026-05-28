import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './views/home/home.component';
import { CarListComponent } from './views/car-list/car-list.component';
import { CarComponent } from './views/car/car.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'car-list',
    component: CarListComponent,
  },
  {
    path: 'cars/:vin',
    component: CarComponent,
  },
  {
    path: '**',
    redirectTo: 'car-list',
  },
];
