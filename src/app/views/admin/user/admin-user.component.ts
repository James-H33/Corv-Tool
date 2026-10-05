import { Location } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { RouterEventService } from '@common/services/router.service';
import { selectUserById } from '@common/store/user/user.selectors';
import { UserComponent } from '@libs/users/user/user.component';
import { parseUserIdFromRoute } from '@libs/users/utils/parse-user-id-from-route.function';
import { Store } from '@ngrx/store';
import { AdminHubActions } from '../store/admin-hub.actions';
import { selectCurrentUserId, selectFilteredCarsForCurrentUserId } from '../store/admin-hub.selectors';

@Component({
  selector: 'ct-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  imports: [UserComponent, IconComponent],
})
export class AdminUserComponent {
  store = inject(Store);
  routerService = inject(RouterEventService);
  location = inject(Location);
  backArrowIcon = Icon.BackArrow;

  routeUrl = toSignal(this.routerService.routeUrl$);

  userIdFromRoute = computed(() => {
    const route = this.routeUrl();

    if (!route) {
      return null;
    }

    return parseUserIdFromRoute(route);
  });

  currentUserId = this.store.selectSignal(selectCurrentUserId);

  cars = this.store.selectSignal(selectFilteredCarsForCurrentUserId);

  user = computed(() => {
    const userId = this.currentUserId();

    if (!userId) {
      return null;
    }

    return this.store.selectSignal(selectUserById(userId))();
  });

  constructor() {
    effect(() => {
      const userId = this.userIdFromRoute();

      console.log('userId from route:', userId);

      if (userId) {
        this.store.dispatch(AdminHubActions.loadCurrentUserStart({ userId }));
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onCarSearchTextChanged(text: string): void {
    this.store.dispatch(AdminHubActions.setCarSearchText({ text }));
  }
}
