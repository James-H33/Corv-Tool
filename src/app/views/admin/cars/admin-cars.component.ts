import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarActions } from '@common/store/car/car.actions';
import { AddCar } from '@common/types/add-car.interface';
import { Car } from '@common/types/car.interface';
import { CarListComponent } from '@libs/cars/car-list/car-list.component';
import { Store } from '@ngrx/store';
import { AdminHubActions } from '../store/admin-hub.actions';
import { selectFilteredCarsWithUsers, selectIsLoadingCars } from '../store/admin-hub.selectors';

@Component({
  selector: 'ct-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.scss'],
  imports: [CarListComponent],
})
export class AdminCarsComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);

  cars = this.store.selectSignal(selectFilteredCarsWithUsers);
  isLoadingCars = this.store.selectSignal(selectIsLoadingCars);

  ngOnInit(): void {
    this.store.dispatch(CarActions.loadCarsForAdmin());
    this.store.dispatch(AdminHubActions.loadCars());
  }

  onSearchTermChanged(text: string): void {
    this.store.dispatch(AdminHubActions.setCarSearchText({ text }));
  }

  onCarCreated(newCar: AddCar): void {
    this.store.dispatch(CarActions.createCar({ car: newCar }));
  }

  onCarDeleted(carId: string): void {
    this.store.dispatch(CarActions.deleteCar({ id: carId }));
  }

  onCarClicked(car: Car): void {
    this.router.navigate(['v', 'admin', 'cars', car.id]);
  }
}
