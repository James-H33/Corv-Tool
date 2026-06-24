import { createFeature, createReducer, on } from '@ngrx/store';
import { ApplicationActions } from './application.actions';

interface ApplicationState {
  authToken: string | null;
}

export const initialApplicationState: ApplicationState = {
  authToken: null,
};

export const applicationFeature = createFeature({
  name: 'application',
  reducer: createReducer<ApplicationState>(
    initialApplicationState,

    on(ApplicationActions.initSuccess, (state, { authToken }) => {
      return {
        ...state,
        authToken,
      };
    }),

    on(ApplicationActions.loginSuccess, (state, { authToken }) => {
      return {
        ...state,
        authToken,
      };
    }),

    on(ApplicationActions.logout, (state) => {
      return {
        ...state,
        authToken: null,
      };
    }),
  ),
});
