import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { AutoFocusDirective } from '@common/directives/auto-focus/auto-focus.directive';
import { ButtonIconDirective } from '@common/directives/button-icon/button-icon.directives';
import { CarActions } from '@common/store/car/car.actions';
import {
  selectActiveForm,
  selectCarById,
  selectExtractedData,
  selectExtractedDataByType,
} from '@common/store/car/car.selectors';
import { FormTypes } from '@common/types/form-types.enum';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { CarTagComponent } from "../components/tag/car-tag.component";
import { CarVinComponent } from "../components/vin/car-vin.component";

@Component({
  selector: 'ct-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [
    IconComponent,
    RouterLink,
    ButtonIconDirective,
    ReactiveFormsModule,
    AutoFocusDirective,
    CarVinComponent,
    CarTagComponent
],
})
export class CarComponent implements OnDestroy {
  store = inject(Store);
  router = inject(Router);
  backArrowIcon = Icon.BackArrow;

  activeForm = this.store.selectSignal(selectActiveForm);
  extractedData = this.store.selectSignal(selectExtractedData);

  extractedVinData = this.store.selectSignal(selectExtractedDataByType('vin'));
  extractedTagData = this.store.selectSignal(selectExtractedDataByType('tag'));

  extractingDataFor = this.store.selectSignal((state) => state.car.extractingDataFor);

  isExtractingDataForTag = computed(() => this.extractingDataFor() === FormTypes.TrimTag);
  isExtractingDataForVin = computed(() => this.extractingDataFor() === FormTypes.Vin);

  routeChanges = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
  );

  nameModel = signal('');

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

  ngOnDestroy() {
    this.store.dispatch(CarActions.clearFormState());
  }

  editName(): void {
    this.store.dispatch(CarActions.setActiveForm({ formType: FormTypes.Name }));
    this.nameModel.set(this.car()?.name ?? '');
  }

  cancelEditName(): void {
    this.store.dispatch(CarActions.clearFormState());
    this.nameModel.set('');
  }

  saveName(): void {
    const carId = this.car()?.id;

    if (!carId) {
      return;
    }

    this.store.dispatch(
      CarActions.updateCar({
        id: carId,
        data: {
          name: this.nameModel(),
        },
      }),
    );
    this.store.dispatch(CarActions.clearFormState());
  }

  onFileSelected(event: Event, context: 'vin' | 'tag'): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const car = this.car();

    if (!car) {
      return;
    }

    this.store.dispatch(
      CarActions.uploadCarImageForAIDataExtraction({
        id: car.id,
        file,
        for: context === 'vin' ? FormTypes.Vin : FormTypes.TrimTag,
      }),
    );

    input.value = '';
  }
}
