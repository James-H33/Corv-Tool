import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as adminHubEffects from './admin-hub.effects';
import { adminHubFeature } from './admin-hub.reducer';

@NgModule({
  providers: [
    provideState(adminHubFeature),
    provideEffects([adminHubEffects]),
  ],
})
export class AdminHubStoreModule {}
