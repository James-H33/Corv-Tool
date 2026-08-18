import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, output, signal } from '@angular/core';
import { AutoFocusDirective } from '@common/directives/auto-focus/auto-focus.directive';
import { ButtonModule } from '@common/directives/button/button.module';
import { AddCar, AddCarActionType } from '@common/types/add-car.interface';

@Component({
  selector: 'ct-new-car-form',
  templateUrl: './new-car-form.component.html',
  styleUrls: ['./new-car-form.component.scss'],
  imports: [ButtonModule, AutoFocusDirective],
})
export class NewCarFormComponent {
  name = signal('');
  year = signal('');
  dialogRef = inject(DialogRef);

  create = output<AddCar>();

  myOptions = signal([
    { label: '1963', value: '1963' },
    { label: '1964', value: '1964' },
    { label: '1965', value: '1965' },
    { label: '1966', value: '1966' },
    { label: '1967', value: '1967' },
  ]);

  selectYear(year: string): void {
    this.year.set(year);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  useManualEntry(): void {
    const newCar = {
      name: this.name(),
      year: this.year(),
      type: AddCarActionType.ManualEntry,
    };

    this.create.emit(newCar);
  }
}
