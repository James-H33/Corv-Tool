import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@common/interceptors/auth.interceptor';
import { apiErrorInterceptor } from '@common/interceptors/error.interceptor';
import { ApplicationStoreModule } from '@common/store/application/application-store.module';
import { CarStoreModule } from '@common/store/car/car-store.module';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(withInterceptors([authInterceptor, apiErrorInterceptor])),

    importProvidersFrom([
      // Stores
      CarStoreModule,
      ApplicationStoreModule,
    ]),
  ],
};
