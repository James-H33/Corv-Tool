import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ApplicationActions = createActionGroup({
  source: 'Application',
  events: {
    init: emptyProps(),
    initSuccess: props<{ authToken: string }>(),
    login: props<{ email: string; password: string }>(),
    loginSuccess: props<{ authToken: string }>(),
    logout: emptyProps(),
    openMobileMenu: emptyProps(),
    closeMobileMenu: emptyProps(),
  },
});
