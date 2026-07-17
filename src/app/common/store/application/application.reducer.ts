import { createFeature, createReducer, on } from '@ngrx/store';
import { ApplicationActions } from './application.actions';

interface ApplicationState {
  authToken: string | null;
  isMobileMenuOpen: boolean;
}

export const initialApplicationState: ApplicationState = {
  authToken: null,
  isMobileMenuOpen: false,
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

    on(ApplicationActions.forgotPasswordSuccess, (state) => {
      return {
        ...state,
        wasPasswordResetLinkSent: true,
      }
    }),
  ),
});
