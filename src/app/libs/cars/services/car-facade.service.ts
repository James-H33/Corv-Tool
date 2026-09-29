import { Injectable, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { RouterEventService } from '@common/services/router.service';
import { CarActions } from '@common/store/car/car.actions';
import {
  selectActiveForm,
  selectCarById,
  selectExtractedData,
  selectExtractedDataByType,
} from '@common/store/car/car.selectors';
import { Car } from '@common/types/car.interface';
import { FormTypes } from '@common/types/form-types.enum';
import { Store } from '@ngrx/store';

@Injectable()
export class CarFacadeService {
  store = inject(Store);
  router = inject(Router);
  routerService = inject(RouterEventService);

  activeForm = this.store.selectSignal(selectActiveForm);
  extractedData = this.store.selectSignal(selectExtractedData);
  extractedVinData = this.store.selectSignal(selectExtractedDataByType('vin'));
  extractedTagData = this.store.selectSignal(selectExtractedDataByType('tag'));
  extractingDataFor = this.store.selectSignal((state) => state.car.extractingDataFor);

  routeUrl = toSignal(this.routerService.routeUrl$);

  car = computed(() => {
    const id = this.carIdFromRoute();

    if (!id) {
      return null;
    }

    return this.store.selectSignal(selectCarById(id))();
  });

  carIdFromRoute = computed(() => {
    const route = this.routeUrl();

    if (!route) {
      return null;
    }

    const urlSegments = route.split('/');
    const endSegment = urlSegments[urlSegments.length - 1];

    return endSegment.split('?')[0] || null;
  });

  constructor() {
    effect(() => {
      const carId = this.carIdFromRoute();

      if (!carId) {
        return;
      }

      this.store.dispatch(CarActions.loadCarByIdForAdmin({ id: carId }));
    });
  }

  onCarUpdated(event: { id: string; data: Partial<Car> }): void {
    this.store.dispatch(CarActions.updateCar({ id: event.id, data: event.data }));
  }

  onClearFormState(): void {
    this.store.dispatch(CarActions.clearFormState());
  }

  onUploadingCarImageForExtraction(event: { id: string; file: File; for: FormTypes }): void {
    this.store.dispatch(
      CarActions.uploadCarImageForAIDataExtraction({
        id: event.id,
        file: event.file,
        for: event.for,
      }),
    );
  }
}
