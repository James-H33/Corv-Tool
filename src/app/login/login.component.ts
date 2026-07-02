import { Component, computed, effect, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { ButtonModule } from '@common/directives/button/button.module';
import { InputModule } from '@common/directives/input/input.module';
import { emailRegex } from '@common/regex/email.regex';
import { ApplicationActions } from '@common/store/application/application.actions';
import { Store } from '@ngrx/store';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ButtonModule, InputModule, FormField],
})
export class LoginComponent {
  store = inject(Store);

  model = signal<LoginForm>({
    email: '',
    password: '',
  });

  errorMessage = signal<string>('');

  form = form<LoginForm>(this.model, (schemaPath) => {
    required(schemaPath.email);
    email(schemaPath.email, { message: 'Email must be a valid email address' });

    required(schemaPath.password);
    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters long' });
  });

  emailTouchedAndHadInputAtleastOnce = signal(false);
  emailFoucused = signal(false);

  passwordTouchedAndHadInputAtleastOnce = signal(false);
  passwordFoucused = signal(false);

  showEmailInvalidError = computed(() => {
    const { email } = this.form().value();
    const fieldChanged = this.emailTouchedAndHadInputAtleastOnce();
    const fieldFocused = this.emailFoucused();


    return email && !emailRegex.test(email) && fieldChanged && !fieldFocused;
  });

  showPasswordNotLongEnoughError = computed(() => {
    const { password } = this.form().value();
    const fieldChanged = this.passwordTouchedAndHadInputAtleastOnce();
    const fieldFocused = this.passwordFoucused();

    return password && password.length < 8 && fieldChanged && !fieldFocused;
  });

  canSubmit = computed(() => {
    return this.form().valid() && !this.showEmailInvalidError() && !this.showPasswordNotLongEnoughError();
  });

  constructor() {
    effect(() => {
      this.form().value();
      this.errorMessage.set('');
    });

    effect(() => {
      const { email } = this.form().value();
      const fieldTouched = this.form.email().touched();

      if (email && fieldTouched) {
        this.emailTouchedAndHadInputAtleastOnce.set(true);
      }
    });

    effect(() => {
      const { password } = this.form().value();
      const fieldTouched = this.form.password().touched();

      if (password && fieldTouched) {
        this.passwordTouchedAndHadInputAtleastOnce.set(true);
      }
    });
  }

  login(): void {
    const form = this.form();
    const credentials = form.value();

    if (!form.valid()) {
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }

    this.store.dispatch(ApplicationActions.login(credentials));
  }
}
