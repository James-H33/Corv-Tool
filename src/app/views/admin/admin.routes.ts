import { AdminHubComponent } from './admin-hub.component';
import { AdminCarComponent } from './car/admin-car.component';
import { AdminCarsComponent } from './cars/admin-cars.component';

export const adminRoutes = [
  {
    path: '',
    component: AdminHubComponent,
    children: [
      {
        path: 'cars',
        children: [
          {
            path: '',
            component: AdminCarsComponent,
          },
          {
            path: ':id',
            component: AdminCarComponent,
          },
        ],
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.routes').then((m) => m.usersRoutes),
      },
      {
        path: '**',
        redirectTo: 'cars',
      },
    ],
  },
];
