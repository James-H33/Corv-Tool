import { Component, effect, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { ButtonModule } from '@common/directives/button/button.module';
import { ApplicationActions } from '@common/store/application/application.actions';
import { Store } from '@ngrx/store';
import {
  selectForgotPasswordInProgress,
} from '@common/store/application/application.selectors';

@Component({
  selector: 'ct-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [ButtonModule, FormField],
})
export class ForgotPasswordComponent {
  store = inject(Store);

  forgotPasswordInProgress = this.store.selectSignal(selectForgotPasswordInProgress);

  errorMessage = signal<string>('');

  model = signal({
    email: '',
  });

  form = form(this.model, (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Email must be a valid email address' });
  });

  constructor() {
    effect(() => {
      this.form().value();
      this.errorMessage.set('');
    });
  }

  submit(): void {
    if (!this.form().valid()) {
      this.errorMessage.set('Please enter a valid email address');
      return;
    }

    const { email } = this.form().value();

    this.store.dispatch(ApplicationActions.forgotPassword({ email }));
  }
}
