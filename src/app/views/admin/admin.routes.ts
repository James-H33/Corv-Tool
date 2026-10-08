import { AdminHubComponent } from './admin-hub.component';
import { AdminCarComponent } from './car/admin-car.component';
import { AdminCarsComponent } from './cars/admin-cars.component';
import { AdminUserComponent } from './user/admin-user.component';
import { AdminUsersComponent } from './users/admin-users.component';

export const adminRoutes = [
  {
    path: 'cars/:id',
    component: AdminCarComponent,
  },

  {
    path: 'users/:id',
    component: AdminUserComponent,
  },

  {
    path: 'users/:id/car/:carId',
    component: AdminCarComponent,
  },

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
        ],
      },

      {
        path: 'users',
        children: [
          {
            path: '',
            component: AdminUsersComponent,
          },
        ],
      },

      {
        path: '**',
        redirectTo: 'cars',
      },
    ],
  },
];
