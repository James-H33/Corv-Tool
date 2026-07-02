import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from '@common/guards/auth.guard';

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
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'v',
    canActivate: [authGuard],
    loadChildren: () => import('./views/views.routes').then((m) => m.viewsRoutes),
  },
  {
    path: '**',
    redirectTo: 'v/cars',
  },
];
