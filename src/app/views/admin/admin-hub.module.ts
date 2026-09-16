import { NgModule } from '@angular/core';
import { AdminHubStoreModule } from './store/admin-hub.module';
import { adminRoutes } from './admin.routes';
import { provideRouter } from '@angular/router';

@NgModule({
  imports: [
    AdminHubStoreModule
  ],
  providers: [
    provideRouter(adminRoutes),
  ]
})
export class AdminHubModule {}
