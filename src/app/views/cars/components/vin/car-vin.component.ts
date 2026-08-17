import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';
import { form, FormField, required, validate, ValidationResult } from '@angular/forms/signals';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { DropdownDirective } from '@common/directives/dropdown/dropdown.directive';
import { CarActions } from '@common/store/car/car.actions';
import { ExtractedData } from '@common/store/car/car.reducer';
import { Car } from '@common/types/car.interface';
import { FormTypes } from '@common/types/form-types.enum';
import { decodeVin } from '@common/utils/decode/vin/decode.function';
import { validateVin } from '@common/utils/decode/vin/validate-vin.function';
import { Store } from '@ngrx/store';
import { ImageBoxControlsComponent } from '../image-box-controls/image-box-controls.component';
import { CarImageBoxComponent } from '../image-box/car-image-box.component';

@Component({
  selector: 'ct-car-vin',
  templateUrl: './car-vin.component.html',
  styleUrls: ['./car-vin.component.scss'],
  imports: [
    CarImageBoxComponent,
    ImageBoxControlsComponent,
    IconComponent,
    FormField,
    DropdownDirective,
  ],
})
export class CarVinComponent {
  store = inject(Store);
  dropdownRef = viewChild('vinDropdown', { read: DropdownDirective });
  car = input<Car | null | undefined>();
  isFormActive = input(false);
  extractedVinData = input<ExtractedData | null>();
  isExtracting = input(false);
  uploading = output<void>();
  isUsingSketchView = signal(false);

  hasImage = computed(() => {
    const car = this.car();
    const extractedData = this.extractedVinData();
    const extractedImageUrl = extractedData?.imageId;

    if (!car) {
      return false;
    }

    return !!car.vinImageUrl || !!extractedImageUrl;
  });

  decodedVinData = computed(() => {
    const car = this.car();

    if (!car) {
      return null;
    }

    return car.vin ? decodeVin(car.vin, car.year) : null;
  });

  vinModel = signal({
    vin: '',
  });

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

  ellipsesMenuIcon = Icon.EllipsesMenu;

  vinDisplayFields = [
    { label: 'Make', value: 'make' },
    { label: 'Series', value: 'series' },
    { label: 'Body Style', value: 'bodyStyle' },
    { label: 'Model Year', value: 'modelYear' },
    { label: 'Assembly Plant', value: 'assemblyPlant' },
    { label: 'Production Sequence', value: 'productionSequence' },
  ];

  constructor() {
    effect(() => {
      const extractedData = this.extractedVinData();
      const isFormActive = this.isFormActive();

      if (extractedData && isFormActive) {
        const data = extractedData.data as string;

        this.vinModel.set({
          vin: data,
        });

        this.vinForm().markAsDirty();
      }
    });
  }

  onDropdownOpened(): void {
    this.vinForm().reset();
  }

  saveVinEdits(): void {
    const extractedData = this.extractedVinData();

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

  onViewTypeChange(type: 'sketch' | 'actual'): void {
    if (type === 'sketch') {
      this.isUsingSketchView.set(true);
    } else if (type === 'actual') {
      this.isUsingSketchView.set(false);
    }
  }

  editVin(): void {
    this.closeDropdown();
    this.store.dispatch(CarActions.setActiveForm({ formType: FormTypes.Vin }));

    this.vinModel.set({
      vin: this.car()?.vin ?? '',
    });
  }

  closeDropdown(): void {
    this.dropdownRef()?.close();
  }
}
