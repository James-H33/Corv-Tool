import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';

export const usersRoutes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: ':id',
    component: UserComponent,
  },
];
