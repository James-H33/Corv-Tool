import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { SkeletonLoaderComponent } from '@common/components/skeleton/skeleton-loader.component';
import { ButtonIconDirective } from '@common/directives/button-icon/button-icon.directives';
import { DropdownDirective } from '@common/directives/dropdown/dropdown.directive';
import { InputModule } from '@common/directives/input/input.module';
import { CarActions } from '@common/store/car/car.actions';
import { selectFilteredCars, selectIsLoadingCars } from '@common/store/car/car.selectors';
import { Car } from '@common/types/car.interface';
import { Store } from '@ngrx/store';
import { NewCarFormComponent } from '../components/new-car-form/new-car-form.component';

@Component({
  selector: 'ct-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  imports: [
    InputModule,
    RouterLink,
    IconComponent,
    SkeletonLoaderComponent,
    ButtonIconDirective,
    DialogModule,
    DropdownDirective,
  ],
})
export class CarListComponent implements OnInit, OnDestroy {
  store = inject(Store);
  dialog = inject(Dialog);
  ellipsesMenuIcon = Icon.EllipsesMenu;
  galleryIcon = Icon.Gallery;
  cameraIcon = Icon.Camera;
  destroyRef = inject(DestroyRef);

  cars: Signal<Car[]> = this.store.selectSignal(selectFilteredCars);

  isLoadingCars = this.store.selectSignal(selectIsLoadingCars);

  dropdowns = viewChildren(DropdownDirective);

  textSearch = signal('');

  constructor() {
    effect(() => {
      const text = this.textSearch();

      this.store.dispatch(CarActions.setSearchText({ text }));
    });
  }

  ngOnInit(): void {
    this.store.dispatch(CarActions.loadCars());
  }

  ngOnDestroy(): void {
    this.store.dispatch(CarActions.setSearchText({ text: '' }));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(NewCarFormComponent, {
      width: '90vw',
      maxWidth: '400px',
    });

    const instance = dialogRef.componentInstance as NewCarFormComponent;

    const createSubscription = instance.create.subscribe((newCar) => {
      dialogRef.close();
      this.store.dispatch(CarActions.createCar({ car: newCar }));
    });

    dialogRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      createSubscription?.unsubscribe();
    });
  }

  openOptionsMenu(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

  onDeleteCar(carId: string): void {
    const dropdownsArray = this.dropdowns();

    for (const dropdown of dropdownsArray) {
      dropdown?.close();
    }

    this.store.dispatch(CarActions.deleteCar({ id: carId }));
  }
}
