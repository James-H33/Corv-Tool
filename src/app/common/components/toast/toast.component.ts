import { Component, inject } from '@angular/core';
import { ToastService } from '@common/services/toast.service';

@Component({
  selector: 'ct-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toastService = inject(ToastService);

  toasts = this.toastService.toasts;

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }

  pauseDismissTimer(id: number): void {
    this.toastService.pauseDismissTimer(id);
  }

  resumeDismissTimer(id: number): void {
    this.toastService.resumeDismissTimer(id);
  }
}
