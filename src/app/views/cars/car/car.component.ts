import { Component, computed, effect, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FieldTree,
  form,
  FormField,
  required,
  validate,
  ValidationResult,
} from '@angular/forms/signals';

import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { AutoFocusDirective } from '@common/directives/auto-focus/auto-focus.directive';
import { ButtonIconDirective } from '@common/directives/button-icon/button-icon.directives';
import { DropdownDirective } from '@common/directives/dropdown/dropdown.directive';
import { CarActions } from '@common/store/car/car.actions';
import {
  selectActiveForm,
  selectCarById,
  selectExtractedData,
  selectExtractedDataByType,
} from '@common/store/car/car.selectors';
import { CarTagData } from '@common/types/car.interface';
import { FormTypes } from '@common/types/form-types.enum';
import { trimTagDecoder } from '@common/utils/decode/trim-tag/decode.function';
import { decodeVin } from '@common/utils/decode/vin/decode.function';
import { validateVin } from '@common/utils/decode/vin/validate-vin.function';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { CarImageBoxComponent } from '../components/image-box/car-image-box.component';

@Component({
  selector: 'ct-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [
    IconComponent,
    RouterLink,
    ButtonIconDirective,
    DropdownDirective,
    ReactiveFormsModule,
    FormField,
    AutoFocusDirective,
    CarImageBoxComponent,
  ],
})
export class CarComponent implements OnDestroy {
  store = inject(Store);
  router = inject(Router);
  backArrowIcon = Icon.BackArrow;

  vinDropdownRef = viewChild('vinDropdown', { read: DropdownDirective });
  trimTagDropdownRef = viewChild('trimTagDropdown', { read: DropdownDirective });

  activeDropdownContext = signal<string | null>(null);

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

  trimModel = signal({
    body: '',
    trim: '',
    style: '',
    paint: '',
    dateCode: '',
  });

  vinModel = signal({
    vin: '',
  });

  nameModel = signal('');

  vinForm = form(this.vinModel, (schemaPath) => {
    required(schemaPath.vin, { message: 'VIN is required' });
    validate(schemaPath.vin, (value): ValidationResult => {
      const car = this.car();

      if (!car) {
        return { kind: 'carNotFound', message: 'Car not found' };
      }

      const { isValid, invalidReason } = validateVin(value.value(), car.year!);

      return isValid ? null : { kind: 'invalidVin', message: invalidReason };
    });
  });

  trimForm = form(this.trimModel, (schemaPath) => {
    required(schemaPath.body);
    required(schemaPath.trim);
    required(schemaPath.style);
    required(schemaPath.paint);
    required(schemaPath.dateCode);
  });

  trimFieldsMap: Record<string, FieldTree<string, string>> = {
    body: this.trimForm.body,
    trim: this.trimForm.trim,
    style: this.trimForm.style,
    paint: this.trimForm.paint,
    dateCode: this.trimForm.dateCode,
  };

  trimTagDisplayFields = [
    { label: 'Body', value: 'body' },
    { label: 'Trim', value: 'trim' },
    { label: 'Style', value: 'style' },
    { label: 'Paint', value: 'paint' },
    { label: 'Date', value: 'dateCode' },
  ];

  vinDisplayFields = [
    { label: 'Make', value: 'make' },
    { label: 'Series', value: 'series' },
    { label: 'Body Style', value: 'bodyStyle' },
    { label: 'Model Year', value: 'modelYear' },
    { label: 'Assembly Plant', value: 'assemblyPlant' },
    { label: 'Production Sequence', value: 'productionSequence' },
  ];

  isUsingVinSketchView = signal(false);
  isUsingTagSketchView = signal(false);

  car = computed(() => {
    const id = this.carIdFromRoute();

    if (!id) {
      return null;
    }

    return this.store.selectSignal(selectCarById(id))();
  });

  decodedTagData = computed(() => {
    const car = this.car();

    if (!car) {
      return null;
    }

    return trimTagDecoder(car.tagData, car.year);
  });

  decodedVinData = computed(() => {
    const car = this.car();

    if (!car) {
      return null;
    }

    return car.vin ? decodeVin(car.vin, car.year) : null;
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

  hasVinImage = computed(() => {
    const car = this.car();
    const extractedData = this.extractedData();
    const extractedImageUrl = extractedData?.imageId;

    if (!car) {
      return false;
    }

    return !!car.vinImageUrl || !!extractedImageUrl;
  });

  hasTagImage = computed(() => {
    const car = this.car();
    const extractedData = this.extractedData();
    const extractedImageUrl = extractedData?.imageId;

    if (!car) {
      return false;
    }

    return !!car.tagImageUrl || !!extractedImageUrl;
  });

  tagData = computed(() => {
    const car = this.car();
    const extractedData = this.extractedData();
    const activeForm = this.activeForm();

    if (!car) {
      return null;
    }

    return extractedData && activeForm === FormTypes.TrimTag ? extractedData : car.tagData;
  });

  constructor() {
    effect(() => {
      const carId = this.carIdFromRoute();

      if (!carId) {
        return;
      }

      this.store.dispatch(CarActions.loadCarById({ id: carId }));
    });

    effect(() => {
      const extractedData = this.extractedData();
      const activeForm = this.activeForm();

      if (extractedData && activeForm === FormTypes.TrimTag) {
        const data = extractedData.data as CarTagData;

        this.trimModel.set({
          body: data.body,
          trim: data.trim,
          style: data.style,
          paint: data.paint,
          dateCode: data.dateCode,
        });

        this.trimForm().markAsDirty();
      } else if (extractedData && activeForm === FormTypes.Vin) {
        const data = extractedData.data as string;

        this.vinModel.set({
          vin: data,
        });

        this.vinForm().markAsDirty();
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(CarActions.clearFormState());
  }

  onDropdownOpened(context: string): void {
    this.activeDropdownContext.set(context);
    this.resetForms();
  }

  resetForms(): void {
    this.store.dispatch(CarActions.clearFormState());
    this.trimForm().reset();
    this.vinForm().reset();
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

  retakeTag(): void {
    this.closeDropdownBasedOnContext();
  }

  retakeVin(): void {
    this.closeDropdownBasedOnContext();
  }

  uploadTag(): void {
    this.closeDropdownBasedOnContext();
  }

  uploadVin(): void {
    this.closeDropdownBasedOnContext();
  }

  editTag(): void {
    this.closeDropdownBasedOnContext();
    const context = this.activeDropdownContext();
    this.store.dispatch(CarActions.setActiveForm({ formType: FormTypes.TrimTag }));


    if (context === FormTypes.TrimTag) {
      const data = this.car()?.tagData;

      if (!data) {
        return;
      }

      this.trimModel.set({
        body: data.body,
        trim: data.trim,
        style: data.style,
        paint: data.paint,
        dateCode: data.dateCode,
      });
    }
  }

  editVin(): void {
    this.closeDropdownBasedOnContext();
    const context = this.activeDropdownContext();
    this.store.dispatch(CarActions.setActiveForm({ formType: FormTypes.Vin }));

    if (context === FormTypes.Vin) {
      this.vinModel.set({
        vin: this.car()?.vin ?? '',
      });
    }
  }

  closeDropdownBasedOnContext(): void {
    const context = this.activeDropdownContext();
    const vinDropdown = this.vinDropdownRef();
    const trimTagDropdown = this.trimTagDropdownRef();

    if (context === FormTypes.Vin && vinDropdown) {
      vinDropdown.close();
    } else if (context === FormTypes.TrimTag && trimTagDropdown) {
      trimTagDropdown.close();
    }
  }

  saveTrimTagEdits(): void {
    let currentTagImage = this.car()?.tagImageUrl;
    const carId = this.car()?.id;

    const updatePayload: CarTagData = {
      trim: this.trimModel().trim,
      style: this.trimModel().style,
      body: this.trimModel().body,
      paint: this.trimModel().paint,
      dateCode: this.trimModel().dateCode,
    };

    const extractedData = this.extractedData();

    if (extractedData?.imageId) {
      currentTagImage = extractedData.imageId;
    }

    this.store.dispatch(
      CarActions.updateCar({
        id: carId!,
        data: {
          tagData: updatePayload,
          tagImageUrl: currentTagImage,
        },
      }),
    );

    this.store.dispatch(CarActions.clearFormState());
  }

  cancelTrimTagEdits(): void {
    this.trimForm().reset();
    this.store.dispatch(CarActions.clearFormState());
  }

  saveVinEdits(): void {
    const extractedData = this.extractedData();

    let currentVinImage = this.car()?.vinImageUrl;
    const carId = this.car()?.id;

    if (extractedData?.imageId) {
      currentVinImage = extractedData.imageId;
    }

    this.store.dispatch(
      CarActions.updateCar({
        id: carId!,
        data: {
          vin: this.vinModel().vin,
          vinImageUrl: currentVinImage,
        },
      }),
    );

    this.store.dispatch(CarActions.clearFormState());
  }

  cancelVinEdits(): void {
    this.vinForm().reset();
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

  useActualView(type: 'vin' | 'tag'): void {
    if (type === 'vin') {
      this.isUsingVinSketchView.set(false);
    } else if (type === 'tag') {
      this.isUsingTagSketchView.set(false);
    }
  }

  useSketchView(type: 'vin' | 'tag'): void {
    if (type === 'vin') {
      this.isUsingVinSketchView.set(true);
    } else if (type === 'tag') {
      this.isUsingTagSketchView.set(true);
    }
  }
}
