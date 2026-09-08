import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { SkeletonLoaderComponent } from '@common/components/skeleton/skeleton-loader.component';
import { DropdownDirective } from '@common/directives/dropdown/dropdown.directive';
import { InputModule } from '@common/directives/input/input.module';
import { Car } from '@common/types/car.interface';
import { Store } from '@ngrx/store';
import { NewCarFormComponent } from '../components/new-car-form/new-car-form.component';
import { AddCar } from '@common/types/add-car.interface';

@Component({
  selector: 'ct-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  imports: [
    InputModule,
    RouterLink,
    IconComponent,
    SkeletonLoaderComponent,
    DialogModule,
    DropdownDirective,
  ],
})
export class CarListComponent implements OnDestroy {
  store = inject(Store);
  dialog = inject(Dialog);

  // Inputs
  title = input<string>('Your Cars');
  isAdmin = input<boolean>(false);
  isLoadingCars = input<boolean>(false);
  cars = input<Car[]>([]);

  // Ouputs
  searchTermChanged = output<string>();
  carCreated = output<AddCar>();
  carDeleted = output<string>();

  ellipsesMenuIcon = Icon.EllipsesMenu;
  galleryIcon = Icon.Gallery;
  cameraIcon = Icon.Camera;
  destroyRef = inject(DestroyRef);

  dropdowns = viewChildren(DropdownDirective);

  textSearch = signal('');

  constructor() {
    effect(() => {
      const text = this.textSearch();

      this.searchTermChanged.emit(text);
    });
  }

  ngOnDestroy(): void {
    this.searchTermChanged.emit('');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(NewCarFormComponent, {
      width: '90vw',
      maxWidth: '400px',
    });

    const instance = dialogRef.componentInstance as NewCarFormComponent;

    const createSubscription = instance.create.subscribe((newCar) => {
      dialogRef.close();
      this.carCreated.emit(newCar);
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

    this.carDeleted.emit(carId);
  }
}
