import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FieldTree, form, FormField, required } from '@angular/forms/signals';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { DropdownDirective } from '@common/directives/dropdown/dropdown.directive';
import { CarActions } from '@common/store/car/car.actions';
import { ExtractedData } from '@common/store/car/car.reducer';
import { Car, CarTagData } from '@common/types/car.interface';
import { FormTypes } from '@common/types/form-types.enum';
import { trimTagDecoder } from '@common/utils/decode/trim-tag/decode.function';
import { Store } from '@ngrx/store';
import { ImageBoxControlsComponent } from '../image-box-controls/image-box-controls.component';
import { CarImageBoxComponent } from '../image-box/car-image-box.component';

@Component({
  selector: 'ct-car-tag',
  templateUrl: './car-tag.component.html',
  styleUrls: ['./car-tag.component.scss'],
  imports: [
    CarImageBoxComponent,
    ImageBoxControlsComponent,
    IconComponent,
    FormField,
    DropdownDirective,
  ],
})
export class CarTagComponent {
  store = inject(Store);
  dropdownRef = viewChild('tagDropdown', { read: DropdownDirective });
  car = input<Car | null | undefined>();
  isFormActive = input(false);
  extractedTagData = input<ExtractedData | null>();
  isExtracting = input(false);
  uploading = output<void>();
  isUsingSketchView = signal(false);

  hasImage = computed(() => {
    const car = this.car();
    const extractedData = this.extractedTagData();
    const extractedImageUrl = extractedData?.imageId;

    if (!car) {
      return false;
    }

    return !!car.tagImageUrl || !!extractedImageUrl;
  });

  decodedTagData = computed(() => {
    const car = this.car();

    if (!car || !car.tagData || !car.year) {
      return null;
    }

    return trimTagDecoder(car.tagData, car.year);
  });

  hasTagData = computed(() => {
    const car = this.car();
    const extractedData = this.extractedTagData();
    const isFormActive = this.isFormActive();

    if (!car) {
      return null;
    }

    return Boolean(extractedData && isFormActive ? extractedData : car.tagData);
  });

  trimModel = signal({
    body: '',
    trim: '',
    style: '',
    paint: '',
    dateCode: '',
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
    { label: 'Style', value: 'style' },
    { label: 'Trim', value: 'trim' },
    { label: 'Body', value: 'body' },
    { label: 'Paint', value: 'paint' },
    { label: 'Date', value: 'dateCode' },
  ];

  trimTagsDecodeHasErrors = computed(() => {
    const decodedTagData = this.decodedTagData();

    if (!decodedTagData) {
      return false;
    }

    return Object.values(decodedTagData).some((info) => info.error);
  });

  ellipsesMenuIcon = Icon.EllipsesMenu;

  constructor() {
    effect(() => {
      const extractedData = this.extractedTagData();
      const isFormActive = this.isFormActive();

      if (extractedData && isFormActive) {
        const data = extractedData.data as CarTagData;

        this.trimModel.set({
          body: data.body,
          trim: data.trim,
          style: data.style,
          paint: data.paint,
          dateCode: data.dateCode,
        });

        this.trimForm().markAsDirty();
      }
    });
  }

  onDropdownOpened(): void {
    this.trimForm().reset();
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

    const extractedData = this.extractedTagData();

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

  onViewTypeChange(type: 'sketch' | 'actual'): void {
    if (type === 'sketch') {
      this.isUsingSketchView.set(true);
    } else if (type === 'actual') {
      this.isUsingSketchView.set(false);
    }
  }

  uploadTag(): void {
    this.dropdownRef()?.close();
  }

  editTag(): void {
    this.closeDropdown();
    this.store.dispatch(CarActions.setActiveForm({ formType: FormTypes.TrimTag }));

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

  closeDropdown(): void {
    this.dropdownRef()?.close();
  }
}
