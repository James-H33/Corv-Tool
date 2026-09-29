import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AdminHubActions = createActionGroup({
  source: 'AdminHub',
  events: {
    loadCars: emptyProps(),
    loadCarsSuccess: props<{ carIds: string[] }>(),

    loadUsersInit: emptyProps(),
    loadUsersInitSuccess: props<{ userIds: string[]; page: number; loadedUserIds: string[] }>(),

    loadNextSetOfUsers: emptyProps(),
    loadNextSetOfUsersSuccess: props<{ page: number; loadedUserIds: string[] }>(),
  },
});
