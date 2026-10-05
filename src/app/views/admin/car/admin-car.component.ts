import { Location } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { RouterEventService } from '@common/services/router.service';
import { CarActions } from '@common/store/car/car.actions';
import { selectCarById } from '@common/store/car/car.selectors';
import { CarComponent } from '@libs/cars/car/car.component';
import { parseCarIdFromRoute } from '@libs/cars/utils/parse-car-id-from-route.function';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ct-admin-car',
  templateUrl: './admin-car.component.html',
  styleUrls: ['./admin-car.component.scss'],
  imports: [CarComponent, IconComponent],
})
export class AdminCarComponent {
  store = inject(Store);
  router = inject(Router);
  routerService = inject(RouterEventService);
  location = inject(Location);

  backArrowIcon = Icon.BackArrow;

  routeUrl = toSignal(this.routerService.routeUrl$);

  car = computed(() => {
    const id = this.carIdFromRoute();

    if (!id) {
      return null;
    }

    return this.store.selectSignal(selectCarById(id))();
  });

  carIdFromRoute = computed(() => {
    const route = this.routeUrl();

    if (!route) {
      return null;
    }

    return parseCarIdFromRoute(route);
  });

  constructor() {
    effect(() => {
      const carId = this.carIdFromRoute();

      if (!carId) {
        return;
      }

      this.store.dispatch(CarActions.loadCarByIdForAdmin({ id: carId }));
    });
  }

  goBack(): void {
    this.location.back();
  }
}
