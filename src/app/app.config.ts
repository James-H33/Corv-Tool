import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CarStoreModule } from '@common/store/car/car-store.module';
import { apiErrorInterceptor } from '@common/interceptors/error.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from '@common/interceptors/auth-token.interceptor';
import { ApplicationStoreModule } from '@common/store/application/application-store.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(withInterceptors([authTokenInterceptor, apiErrorInterceptor])),

    importProvidersFrom([
      // Stores
      CarStoreModule,
      ApplicationStoreModule,
    ]),
  ],
};
