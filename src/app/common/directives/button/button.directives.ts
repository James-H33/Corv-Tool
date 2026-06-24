/* eslint-disable @angular-eslint/no-input-rename */
import { Directive, input } from '@angular/core';

@Directive({
  selector: '[ctButton]',
  standalone: true,
})
export class ButtonDirective {
  buttonVariant = input('', { alias: 'ctButtonVariant' });
}
