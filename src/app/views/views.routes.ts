import { HomeComponent } from './home/home.component';

export const viewsRoutes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.routes').then((m) => m.carsRoutes),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  // }
];
