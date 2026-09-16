import { createFeature, createReducer, on } from '@ngrx/store';
import { AdminHubActions } from './admin-hub.actions';

interface AdminHubState {
  carIds: string[];
  isLoadingCars: boolean;
  searchText: string;
}

export const initialAdminHubState: AdminHubState = {
  carIds: [],
  isLoadingCars: false,
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

  ),
});
