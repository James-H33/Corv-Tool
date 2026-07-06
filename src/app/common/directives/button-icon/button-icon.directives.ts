/* eslint-disable @angular-eslint/no-input-rename */
import { Directive, input } from '@angular/core';

@Directive({
  selector: 'button[ctButtonIcon]',
  standalone: true,
})
export class ButtonIconDirective {
  buttonVariant = input('', { alias: 'ctButtonVariant' });
}
