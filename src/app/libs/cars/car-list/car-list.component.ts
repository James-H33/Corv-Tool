import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Icon, IconComponent } from '@common/components/icon/icon.component';
import { ModalComponent } from '@common/components/modal/modal.component';
import { SkeletonLoaderComponent } from '@common/components/skeleton/skeleton-loader.component';
import { DropdownDirective } from '@common/directives/dropdown/dropdown.directive';
import { InputModule } from '@common/directives/input/input.module';
import { AddCar } from '@common/types/add-car.interface';
import { Car } from '@common/types/car.interface';
import { Store } from '@ngrx/store';
import { DeleteCarModalComponent } from '../components/delete-car-modal/delete-car-modal.component';
import { NewCarFormComponent } from '../components/new-car-form/new-car-form.component';

@Component({
  selector: 'ct-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  imports: [
    InputModule,
    IconComponent,
    SkeletonLoaderComponent,
    DialogModule,
    DropdownDirective,
    ModalComponent,
    DeleteCarModalComponent,
  ],
})
export class CarListComponent implements OnDestroy {
  store = inject(Store);
  dialog = inject(Dialog);

  // Inputs
  title = input<string>('Your Cars');
  isAdmin = input<boolean>(false);
  isLoadingCars = input<boolean>(false);
  hideAddCar = input<boolean>(false);
  showOwners = input<boolean>(false);
  cars = input<Car[]>([]);

  // Ouputs
  searchTermChanged = output<string>();
  carCreated = output<AddCar>();
  carDeleted = output<string>();
  carClicked = output<Car>();

  ellipsesMenuIcon = Icon.EllipsesMenu;
  galleryIcon = Icon.Gallery;
  cameraIcon = Icon.Camera;
  destroyRef = inject(DestroyRef);

  deleteCarModal = viewChild<ModalComponent>(ModalComponent);
  dropdowns = viewChildren(DropdownDirective);

  textSearch = signal('');

  carIdToDelete: string | null = null;

  carRoute = computed(() => (this.isAdmin() ? '/v/admin/cars' : '/v/cars'));

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
    this.carIdToDelete = carId;

    this.deleteCarModal()?.open();
    const dropdownsArray = this.dropdowns();

    for (const dropdown of dropdownsArray) {
      dropdown?.close();
    }
  }

  closeModal(): void {
    this.deleteCarModal()?.close();
  }

  onDeleteCarConfirmed(): void {
    if (!this.carIdToDelete) {
      return;
    }

    this.carDeleted.emit(this.carIdToDelete);
    this.carIdToDelete = null;
    this.closeModal();
  }

  onDeleteCarCanceled(): void {
    this.closeModal();
  }
}
