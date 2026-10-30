import { ViewsComponent } from './views.component';

export const viewsRoutes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'cars',
        loadChildren: () => import('./cars/cars.routes').then((m) => m.carsRoutes),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin-hub.module').then((m) => m.AdminHubModule),
      }
    ],
  },
];
