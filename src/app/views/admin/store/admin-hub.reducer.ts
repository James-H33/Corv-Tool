import { createFeature, createReducer, on } from '@ngrx/store';
import { AdminHubActions } from './admin-hub.actions';

interface AdminHubState {
  carIds: string[];
  userIds: string[];
  page: number;
  loadedUserIds: string[];
  isLoadingCars: boolean;
  carSearchText: string;
  usersTextSearch: string;
  isLoadingUsers: boolean;
  currentUserId: string | null;
}

export const initialAdminHubState: AdminHubState = {
  carIds: [],
  userIds: [],
  page: 0,
  loadedUserIds: [],
  isLoadingCars: false,
  isLoadingUsers: false,
  currentUserId: null,
  carSearchText: '',
  usersTextSearch: '',
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

    on(AdminHubActions.loadUsers, (state, { filters }) => ({
      ...state,
      usersTextSearch: filters?.searchText || '',
      userIds: [],
      loadedUserIds: [],
      page: 1,
      isLoadingUsers: true,
    })),

    on(AdminHubActions.loadUsersSuccess, (state, { loadedUserIds, userIds, page }) => ({
      ...state,
      loadedUserIds,
      userIds,
      page,
      isLoadingUsers: false,
    })),

    on(AdminHubActions.loadNextSetOfUsers, (state) => ({
      ...state,
      isLoadingUsers: true,
    })),

    on(AdminHubActions.loadNextSetOfUsersSuccess, (state, { page, loadedUserIds }) => ({
      ...state,
      page,
      loadedUserIds,
      isLoadingUsers: false,
    })),

    on(AdminHubActions.loadCurrentUserStart, (state, { userId }) => ({
      ...state,
      currentUserId: userId,
    })),

    on(AdminHubActions.setCarSearchText, (state, { text }) => ({
      ...state,
      carSearchText: text,
    }))
  ),
});
