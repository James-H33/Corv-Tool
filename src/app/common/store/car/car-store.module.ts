import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { carFeature } from './car.reducer';
import * as carEffects from './car.effects';

@NgModule({
  providers: [
    provideStore(),
    provideState(carFeature),
    provideEffects([carEffects]),
  ],
})
export class CarStoreModule {}
