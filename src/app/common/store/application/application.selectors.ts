import { createSelector } from '@ngrx/store';
import { applicationFeature } from './application.reducer';

export const { selectAuthToken, selectIsMobileMenuOpen } = applicationFeature;

export const selectAppCredentials = createSelector(selectAuthToken, (authToken) => {
  if (authToken) {
    const userInfoSection = authToken.split('.')[1];
    const json = atob(userInfoSection);
    const decodedToken = JSON.parse(json);

    return {
      userId: decodedToken.userId,
      email: decodedToken.email,
    };
  } else {
    return null;
  }
});

export const selectUserName = createSelector(selectAppCredentials, (credentials) => {
  if (credentials) {
    const email = credentials.email;
    const atIndex = email.indexOf('@');

    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
  }

  return null;
});

export const selectIsLoggedIn = createSelector(selectAuthToken, (authToken) => {
  return !!authToken;
});
