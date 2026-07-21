import { toSignal } from '@angular/core/rxjs-interop';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { IconComponent } from '@common/components/icon/icon.component';
import { ApplicationActions } from '@common/store/application/application.actions';
import { Store } from '@ngrx/store';
import { selectPasswordResetInProgress } from '@common/store/application/application.selectors';

@Component({
  selector: 'ct-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [FormField, IconComponent],
})
export class ResetPasswordComponent {
  route = inject(ActivatedRoute);
  store = inject(Store);

  passwordResetInProgress = this.store.selectSignal(selectPasswordResetInProgress);

  errorMessage = signal('');

  showPassword = signal(false);

  model = signal({
    password: '',
    confirmPassword: '',
  });

  form = form(this.model, (schema) => {
    required(schema.password, { message: 'Password is required' });
    minLength(schema.password, 8, { message: 'Password must be at least 8 characters long' });

    required(schema.confirmPassword, { message: 'Please confirm your password' });
  });

  resetToken = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('token') ?? '')), {
    initialValue: '',
  });

  constructor() {
    effect(() => {
      const resetToken = this.resetToken();

      console.log('ResetToken: ', resetToken);
    });

    effect(() => {
      this.form().value();
      this.errorMessage.set('');
    });
  }

  submit(): void {
    if (!this.form().valid()) {
      this.errorMessage.set('All fields required for submission.');
    }

    const { password, confirmPassword } = this.form().value();

    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    const resetToken = this.resetToken();

    this.store.dispatch(
      ApplicationActions.resetPassword({ token: resetToken, newPassword: password }),
    );
  }

  toggleShowPassword(): void {
    this.showPassword.update((value) => !value);
  }
}
