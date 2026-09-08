import { Component, inject, OnInit } from '@angular/core';
import { CarActions } from '@common/store/car/car.actions';
import { selectFilteredCars, selectIsLoadingCars } from '@common/store/car/car.selectors';
import { AddCar } from '@common/types/add-car.interface';
import { CarListComponent } from '@libs/cars/car-list/car-list.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ct-cars-view',
  templateUrl: './cars-view.component.html',
  styleUrls: ['./cars-view.component.scss'],
  imports: [CarListComponent],
})
export class CarsViewComponent implements OnInit {
  store = inject(Store);

  cars = this.store.selectSignal(selectFilteredCars);
  isLoadingCars = this.store.selectSignal(selectIsLoadingCars);

  ngOnInit(): void {
    this.store.dispatch(CarActions.loadCars());
  }

  onSearchTermChanged(text: string): void {
    this.store.dispatch(CarActions.setSearchText({ text }));
  }

  onCarCreated(newCar: AddCar): void {
    this.store.dispatch(CarActions.createCar({ car: newCar }));
  }

  onCarDeleted(carId: string): void {
    this.store.dispatch(CarActions.deleteCar({ id: carId }));
  }
}
