import { HomeComponent } from './home/home.component';
import { ViewsComponent } from './views.component';

export const viewsRoutes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'cars',
        loadChildren: () => import('./cars/cars.routes').then((m) => m.carsRoutes),
      },
    ],
  },
];
