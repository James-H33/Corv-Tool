import { createSelector } from '@ngrx/store';
import { applicationFeature } from './application.reducer';

export const { selectAuthToken, selectIsMobileMenuOpen } = applicationFeature;

export const selectAppCredentials = createSelector(selectAuthToken, (authToken) => {
  if (authToken) {
    const decodedToken = atob(authToken);
    const [username, userId] = decodedToken.split(':');

    return {
      username,
      userId,
    };
  } else {
    return null;
  }
});

export const selectIsLoggedIn = createSelector(selectAuthToken, (authToken) => {
  return !!authToken;
});
