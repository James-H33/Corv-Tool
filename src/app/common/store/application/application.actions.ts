import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ApplicationActions = createActionGroup({
  source: 'Application',
  events: {
    login: props<{ email: string; password: string }>(),
    loginSuccess: props<{ authToken: string }>(),

    logout: emptyProps(),

    signup: props<{ email: string; password: string }>(),
    signupSuccess: props<{ authToken: string }>(),

    openMobileMenu: emptyProps(),
    closeMobileMenu: emptyProps(),

    setAuthToken: props<{ authToken: string }>(),

    forgotPassword: props<{ email: string }>(),
    forgotPasswordSuccess: emptyProps(),

    resetPassword: props<{ token: string; newPassword: string }>(),
    resetPasswordSuccess: emptyProps(),
  },
});
