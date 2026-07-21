import { createFeature, createReducer, on } from '@ngrx/store';
import { ApplicationActions } from './application.actions';

interface ApplicationState {
  authToken: string | null;
  isMobileMenuOpen: boolean;
  passwordResetInProgress: boolean;
  forgotPasswordInProgress: boolean;
}

export const initialApplicationState: ApplicationState = {
  authToken: null,
  isMobileMenuOpen: false,
  passwordResetInProgress: false,
  forgotPasswordInProgress: false,
};

export const applicationFeature = createFeature({
  name: 'application',
  reducer: createReducer<ApplicationState>(
    initialApplicationState,

    on(ApplicationActions.loginSuccess, (state, { authToken }) => {
      return {
        ...state,
        loginError: null,
        authToken,
      };
    }),

    on(ApplicationActions.signupSuccess, (state, { authToken }) => {
      return {
        ...state,
        loginError: null,
        authToken,
      };
    }),

    on(ApplicationActions.logout, (state) => {
      return {
        ...state,
        authToken: null,
      };
    }),

    on(ApplicationActions.openMobileMenu, (state) => {
      return {
        ...state,
        isMobileMenuOpen: true,
      };
    }),

    on(ApplicationActions.closeMobileMenu, (state) => {
      return {
        ...state,
        isMobileMenuOpen: false,
      };
    }),

    on(ApplicationActions.setAuthToken, (state, { authToken }) => {
      return {
        ...state,
        authToken,
      };
    }),

    on(ApplicationActions.forgotPassword, (state) => {
      return {
        ...state,
        forgotPasswordInProgress: true,
      };
    }),

    on(ApplicationActions.forgotPasswordSuccess, (state) => {
      return {
        ...state,
        forgotPasswordInProgress: false,
      };
    }),

    on(ApplicationActions.resetPassword, (state) => {
      return {
        ...state,
        passwordResetInProgress: true,
      };
    }),

    on(ApplicationActions.resetPasswordSuccess, (state) => {
      return {
        ...state,
        passwordResetInProgress: false,
      };
    }),
  ),
});
