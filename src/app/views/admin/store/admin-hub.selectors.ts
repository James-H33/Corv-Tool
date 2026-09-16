import { adminHubFeature } from "./admin-hub.reducer";
import { createSelector } from '@ngrx/store';
import { selectCars } from '@common/store/car/car.selectors';
import { selectUsersMap } from '@common/store/user/user.selectors';

export const {
  selectCarIds,
  selectIsLoadingCars,
} = adminHubFeature;

export const selectCarsWithUsers = createSelector(
  selectCars,
  selectUsersMap,
  (cars, usersMap) => {
    return cars.map(car => ({
      ...car,
      user: usersMap[car.userId] || null,
    }));
  }
);
