import { Dialog, DialogRef } from '@angular/cdk/dialog';
import {
  Component,
  DestroyRef,
  inject,
  input,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from '@common/directives/button/button.module';
import { take } from 'rxjs';

@Component({
  selector: 'ct-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [ButtonModule],
})
export class ModalComponent {
  dialog = inject(Dialog);
  destroyRef = inject(DestroyRef);
  templateRef = viewChild<TemplateRef<unknown>>('template');

  dialogRef: DialogRef<unknown, unknown> | undefined;

  config = input<{
    width: string;
    maxWidth: string;
  }>({
    width: '90vw',
    maxWidth: '360px',
  });

  opened = output<void>();
  closed = output<void>();

  open(): void {
    const templateRef = this.templateRef();

    if (!templateRef) {
      return;
    }

    this.dialogRef = this.dialog.open(templateRef, this.config());

    this.opened.emit();

    this.dialogRef.closed.pipe(takeUntilDestroyed(this.destroyRef), take(1)).subscribe(() => {
      this.closed.emit();
    });
  }

  close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = undefined;
    }
  }
}
