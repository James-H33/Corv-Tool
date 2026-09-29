import { createFeature, createReducer, on } from '@ngrx/store';
import { AdminHubActions } from './admin-hub.actions';

interface AdminHubState {
  carIds: string[];
  userIds: string[];
  page: number;
  loadedUserIds: string[];
  isLoadingCars: boolean;
  isLoadingUsers: boolean;
  searchText: string;
}

export const initialAdminHubState: AdminHubState = {
  carIds: [],
  userIds: [],
  page: 1,
  loadedUserIds: [],
  isLoadingCars: false,
  isLoadingUsers: false,
  searchText: '',
};

export const adminHubFeature = createFeature({
  name: 'adminHub',
  reducer: createReducer<AdminHubState>(
    initialAdminHubState,

    on(AdminHubActions.loadCars, (state) => ({
      ...state,
      isLoadingCars: true,
    })),

    on(AdminHubActions.loadCarsSuccess, (state, { carIds }) => ({
      ...state,
      carIds,
      isLoadingCars: false,
    })),

    on(AdminHubActions.loadUsersInit, (state) => ({
      ...state,
      userIds: [],
      loadedUserIds: [],
      page: 1,
      isLoadingUsers: true,
    })),

    on(AdminHubActions.loadUsersInitSuccess, (state, { loadedUserIds, userIds, page }) => ({
      ...state,
      loadedUserIds,
      userIds,
      page,
      isLoadingUsers: false,
    })),

    // on(AdminHubActions.loadNextSetOfUsers, (state, { page }) => ({
    //   ...state,
    //   page,
    //   isLoadingUsers: true,
    // })),

    on(AdminHubActions.loadNextSetOfUsersSuccess, (state, { page, loadedUserIds }) => ({
      ...state,
      page,
      loadedUserIds,
      isLoadingUsers: false,
    })),
  ),
});
