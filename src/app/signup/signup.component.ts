import { ButtonModule } from '@common/directives/button/button.module';
import { InputModule } from '@common/directives/input/input.module';
import { ToastService } from '@common/services/toast.service';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { email, form, minLength, required } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { emailRegex } from '@common/regex/email.regex';

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'ct-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ButtonModule, InputModule, FormField, RouterLink],
})
export class SignupComponent {
  toastService = inject(ToastService);

  model = signal<SignupForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  errorMessage = signal<string>('');

  form = form<SignupForm>(this.model, (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Email must be a valid email address' });

    required(schema.password, { message: 'Password is required' });
    minLength(schema.password, 8, { message: 'Password must be at least 8 characters long' });

    required(schema.confirmPassword, { message: 'Please confirm your password' });
  });

  canSubmit = computed(() => {
    return this.form().valid() && this.passwordsMatch();
  });

  showPasswordDoesNotMatchError = computed(() => {
    const { password, confirmPassword } = this.form().value();
    return password && confirmPassword && !this.passwordsMatch();
  });

  showPasswordNotLongEnoughError = computed(() => {
    const { password } = this.form().value();
    return password && password.length < 8;
  });

  showEmailInvalidError = computed(() => {
    const { email } = this.form().value();
    return email && !emailRegex.test(email);
  });

  constructor() {
    effect(this.resetErrorsOnInputChange.bind(this));
  }

  signup(): void {
    const signupForm = this.form();

    if (!signupForm.valid()) {
      this.errorMessage.set('Please fill in all required fields.');
      return;
    }

    if (!this.passwordsMatch()) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.toastService.showToast({
      message: 'Signup form submitted. Signup API wiring is not implemented yet.',
      duration: 4000,
      type: 'info',
    });
  }

  private resetErrorsOnInputChange(): void {
    this.form().value();
    this.errorMessage.set('');
  }

  private passwordsMatch(): boolean {
    const { password, confirmPassword } = this.form().value();

    return password === confirmPassword;
  }
}
