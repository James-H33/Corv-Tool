import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';

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
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-link-sent',
    loadComponent: () =>
      import('./reset-password-link-sent/reset-password-link-sent.component').then(
        (m) => m.ResetPasswordLinkSentComponent,
      ),
  },

  {
    path: 'reset-password',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
  },
  {
    path: 'v',
    loadChildren: () => import('./views/views.routes').then((m) => m.viewsRoutes),
  },
  {
    path: '**',
    redirectTo: 'v/cars',
  },
];
