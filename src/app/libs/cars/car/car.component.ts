import { Component, computed, input, OnDestroy, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AutoFocusDirective } from '@common/directives/auto-focus/auto-focus.directive';
import { ButtonIconDirective } from '@common/directives/button-icon/button-icon.directives';
import { ExtractedData } from '@common/store/car/car.reducer';
import { Car } from '@common/types/car.interface';
import { FormTypes } from '@common/types/form-types.enum';
import { CarTagComponent } from '../components/tag/car-tag.component';
import { CarVinComponent } from '../components/vin/car-vin.component';

@Component({
  selector: 'ct-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [
    ButtonIconDirective,
    ReactiveFormsModule,
    AutoFocusDirective,
    CarVinComponent,
    CarTagComponent,
  ],
})
export class CarComponent implements OnDestroy {
  canEdit = input(true);
  car = input<Car | null>();
  activeForm = input();
  extractedData = input<ExtractedData | null>();
  extractedVinData = input<ExtractedData | null>();
  extractedTagData = input<ExtractedData | null>();
  extractingDataFor = input<FormTypes | null>();

  carUpdated = output<{ id: string; data: Partial<Car> }>();
  activeFormSet = output<{ formType: FormTypes }>();
  clearFormState = output();
  uploadingCarImageForExtraction = output<{
    id: string;
    file: File;
    for: FormTypes;
  }>();

  isExtractingDataForTag = computed(() => this.extractingDataFor() === FormTypes.TrimTag);
  isExtractingDataForVin = computed(() => this.extractingDataFor() === FormTypes.Vin);

  nameModel = signal('');

  ngOnDestroy() {
    this.clearFormState.emit();
  }

  editName(): void {
    this.activeFormSet.emit({ formType: FormTypes.Name });
    this.nameModel.set(this.car()?.name ?? '');
  }

  cancelEditName(): void {
    this.clearFormState.emit();
    this.nameModel.set('');
  }

  saveName(): void {
    const carId = this.car()?.id;

    if (!carId) {
      return;
    }

    this.carUpdated.emit({
      id: carId,
      data: {
        name: this.nameModel(),
      },
    });

    this.clearFormState.emit();
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

    this.uploadingCarImageForExtraction.emit({
      id: car.id,
      file,
      for: context === 'vin' ? FormTypes.Vin : FormTypes.TrimTag,
    });

    input.value = '';
  }
}
