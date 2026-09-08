import { Component, computed, effect, inject } from '@angular/core';
import { FormTypes } from '@common/types/form-types.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarActions } from '@common/store/car/car.actions';
import {
  selectActiveForm,
  selectCarById,
  selectExtractedData,
  selectExtractedDataByType,
} from '@common/store/car/car.selectors';
import { Car } from '@common/types/car.interface';
import { CarComponent } from '@libs/cars/car/car.component';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'ct-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.scss'],
  imports: [CarComponent],
})
export class CarViewComponent {
  store = inject(Store);
  router = inject(Router);

  activeForm = this.store.selectSignal(selectActiveForm);
  extractedData = this.store.selectSignal(selectExtractedData);
  extractedVinData = this.store.selectSignal(selectExtractedDataByType('vin'));
  extractedTagData = this.store.selectSignal(selectExtractedDataByType('tag'));
  extractingDataFor = this.store.selectSignal((state) => state.car.extractingDataFor);

  routeChanges = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
  );

  car = computed(() => {
    const id = this.carIdFromRoute();

    if (!id) {
      return null;
    }

    return this.store.selectSignal(selectCarById(id))();
  });

  carIdFromRoute = computed(() => {
    const route = this.routeChanges();

    if (!route) {
      return null;
    }

    const urlSegments = route.urlAfterRedirects.split('/');
    const endSegment = urlSegments[urlSegments.length - 1];

    return endSegment.split('?')[0] || null;
  });

  constructor() {
    effect(() => {
      const carId = this.carIdFromRoute();

      if (!carId) {
        return;
      }

      this.store.dispatch(CarActions.loadCarById({ id: carId }));
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
