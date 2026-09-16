import { inject, Injectable } from '@angular/core';
import { CarService } from '@common/services/api/car.service';
import { UserService } from '@common/services/api/user.service';
import { Car } from '@common/types/car.interface';
import { User } from '@common/types/user.interface';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminHubService {
  carService = inject(CarService);
  userService = inject(UserService);

  getCarsAndUsers(): Observable<{ cars: Car[]; users: User[] }> {
    const carsRequest = this.carService.geAllCarsForAdmin();

    return carsRequest.pipe(
      switchMap((cars) => {
        const userIds = cars.map(car => car.userId);

        return this.userService.getUsersByIds(userIds).pipe(
          switchMap((users) => {
            return [{ cars, users }];
          })
        );
      })
    );
  }
}
