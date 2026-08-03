import { ButtonModule } from '@common/directives/button/button.module';
import { InputModule } from '@common/directives/input/input.module';
import { ToastService } from '@common/services/toast.service';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { email, form, minLength, required } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { emailRegex } from '@common/regex/email.regex';
import { ApplicationActions } from '@common/store/application/application.actions';
import { Store } from '@ngrx/store';
import { IconComponent } from "@common/components/icon/icon.component";

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'ct-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ButtonModule, InputModule, FormField, RouterLink, IconComponent],
})
export class SignupComponent {
  toastService = inject(ToastService);
  store = inject(Store);

  model = signal<SignupForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  errorMessage = signal<string>('');

  showPassword = signal(false);

  emailTouchedAndHadInputAtleastOnce = signal(false);
  emailFoucused = signal(false);

  passwordTouchedAndHadInputAtleastOnce = signal(false);
  passwordFoucused = signal(false);

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
    const fieldFocused = this.passwordFoucused();

    return password && password.length < 8 && !fieldFocused;
  });

  showEmailInvalidError = computed(() => {
    const { email } = this.form().value();
    const fieldFocused = this.emailFoucused();

    return email && !emailRegex.test(email) && !fieldFocused;
  });

  setEmailFieldTouchedEffect = () => {
    const { email } = this.form().value();
    const fieldTouched = this.form.email().touched();

    if (email && fieldTouched) {
      this.emailTouchedAndHadInputAtleastOnce.set(true);
    }
  };

  setPasswordFieldTouchedEffect = () => {
    const { password } = this.form().value();
    const fieldTouched = this.form.password().touched();

    if (password && fieldTouched) {
      this.passwordTouchedAndHadInputAtleastOnce.set(true);
    }
  };

  resetErrorsOnInputChangeEffect = () => {
    this.form().value();
    this.errorMessage.set('');
  };

  constructor() {
    effect(this.resetErrorsOnInputChangeEffect);
    effect(this.setEmailFieldTouchedEffect);
    effect(this.setPasswordFieldTouchedEffect);
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

    const newUser = {
      email: signupForm.value().email.toLowerCase(),
      password: signupForm.value().password,
    };

    this.store.dispatch(ApplicationActions.signup(newUser));
  }

  toggleShowPassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  private passwordsMatch(): boolean {
    const { password, confirmPassword } = this.form().value();

    return password === confirmPassword;
  }
}
