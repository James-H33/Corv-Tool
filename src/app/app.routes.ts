import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VerifyUserComponent } from './pages/verify-user/verify-user.component';

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
    path: 'verify',
    component: VerifyUserComponent,
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
  },
  {
    path: 'reset-link-sent',
    loadComponent: () =>
      import('./pages/reset-password-link-sent/reset-password-link-sent.component').then(
        (m) => m.ResetPasswordLinkSentComponent,
      ),
  },
  {
    path: 'password-reset-success',
    loadComponent: () =>
      import('./pages/password-reset-success/password-reset-success.component').then(
        (m) => m.PasswordResetSuccessComponent,
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent,
      ),
  },
  {
    path: 'signup-success',
    loadComponent: () =>
      import('./pages/signup-success/signup-success.component').then(
        (m) => m.SignupSuccessComponent,
      ),
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
