import { adminHubFeature } from "./admin-hub.reducer";
import { createSelector } from '@ngrx/store';
import { selectCars } from '@common/store/car/car.selectors';
import { selectUsersMap } from '@common/store/user/user.selectors';

export const {
  selectCarIds,
  selectIsLoadingCars,

  selectUserIds,
  selectLoadedUserIds,
  selectPage,
  selectIsLoadingUsers,

  selectCurrentUserId,
  selectCarSearchText,
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

export const selectAdminViewUsers = createSelector(
  selectUsersMap,
  selectLoadedUserIds,
  (usersMap, loadedUserIds) => {
    return loadedUserIds.map(userId => usersMap[userId]).filter(user => !!user);
  }
);

export const selectNextSetOfUsersToLoad = createSelector(
  selectUserIds,
  selectPage,
  (userIds, page) => {
    return userIds.slice(page * 10, (page + 1) * 10);
  }
);

export const selectCarsForCurrentUserId = createSelector(
  selectCurrentUserId,
  selectCars,
  (currentUserId, cars) => {
    if (!currentUserId) {
      return [];
    }

    return cars.filter(car => car.userId === currentUserId);
  }
);

export const selectFilteredCarsForCurrentUserId = createSelector(
  selectCarsForCurrentUserId,
  selectCarSearchText,
  (cars, carSearchText) => {
    return cars.filter(car => car.name.toLowerCase().includes(carSearchText.toLowerCase()));
  }
);
