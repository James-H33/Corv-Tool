import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ApplicationActions = createActionGroup({
  source: 'Application',
  events: {
    init: emptyProps(),
    initSuccess: props<{ authToken: string }>(),
    login: props<{ username: string; password: string }>(),
    loginSuccess: props<{ authToken: string }>(),
    logout: emptyProps(),
  },
});
