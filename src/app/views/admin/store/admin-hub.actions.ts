import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AdminHubActions = createActionGroup({
  source: 'AdminHub',
  events: {
    loadCars: emptyProps(),
    loadCarsSuccess: props<{ carIds: string[] }>(),

    loadUsersInit: emptyProps(),
    loadUsersInitSuccess: props<{ userIds: string[]; page: number; loadedUserIds: string[] }>(),

    loadNextSetOfUsers: props<{ userIds: string[] }>(),
    loadNextSetOfUsersSuccess: props<{ page: number; loadedUserIds: string[] }>(),

    loadCurrentUserStart: props<{ userId: string }>(),
    loadCurrentUserSuccess: emptyProps(),

    setCarSearchText: props<{ text: string }>(),
  },
});
