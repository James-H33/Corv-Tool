import { Component, output } from '@angular/core';
import { ButtonModule } from '@common/directives/button/button.module';

@Component({
  selector: 'ct-delete-car-modal',
  templateUrl: './delete-car-modal.component.html',
  styleUrls: ['./delete-car-modal.component.scss'],
  imports: [ButtonModule],
})
export class DeleteCarModalComponent {
  deleted = output<void>();
  canceled = output<void>();

  cancel(): void {
    this.canceled.emit();
  }

  deleteCar(): void {
    this.deleted.emit();
  }
}
