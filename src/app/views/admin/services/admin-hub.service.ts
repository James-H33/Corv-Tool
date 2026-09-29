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

/**
 * 1. Load All user ids for the view
 * 2. Load the first 10 users of all user ids for the view
 * 3. Store the loaded users in the state for quick loading later
 * 4. Store the loaded user ids in the admin state for future reference
 * 5. When user requests additional users, load them as needed and update the state accordingly
 */
