import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { userFeature } from './user.reducer';
import * as userEffects from './user.effects';

@NgModule({
  providers: [
    provideStore(),
    provideState(userFeature),
    provideEffects([userEffects]),
  ],
})
export class UserStoreModule {}
