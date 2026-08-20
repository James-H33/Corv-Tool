import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '@common/services/api/car.service';
import { FileService } from '@common/services/api/file.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { EMPTY, of, timer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CarActions } from './car.actions';
import { selectCars } from './car.selectors';

export const loadCars$ = createEffect(
  (actions$ = inject(Actions), carService = inject(CarService)) => {
    return actions$.pipe(
      ofType(CarActions.loadCars),
      switchMap(() => {
        return carService.geAllCars().pipe(
          map((cars) => CarActions.loadCarsSuccess({ cars })),
          catchError(() => {
            return EMPTY;
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loadCarById$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), carService = inject(CarService)) => {
    return actions$.pipe(
      ofType(CarActions.loadCarById),
      concatLatestFrom(() => store.select(selectCars)),
      switchMap(([{ id }, cars]) => {
        return carService
          .getCarById(id)
          .pipe(
            map((car) =>
              CarActions.loadCarByIdSuccess({ cars: [...cars.filter((c) => c.id !== id), car] }),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const updateCar$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), carService = inject(CarService)) => {
    return actions$.pipe(
      ofType(CarActions.updateCar),
      concatLatestFrom(() => store.select(selectCars)),
      switchMap(([{ id, data }, cars]) => {
        return carService.updateCar(id, data).pipe(
          map((updatedCar) => {
            const updatedCars = cars.map((car) => (car.id === id ? updatedCar : car));
            return CarActions.updateCarSuccess({ cars: updatedCars });
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const createCar$ = createEffect(
  (actions$ = inject(Actions), carService = inject(CarService)) => {
    return actions$.pipe(
      ofType(CarActions.createCar),
      switchMap(({ car }) => {
        const date = new Date();

        const newCar = {
          name: car.name || `${date.toISOString().split('T')[0]} - ${car.year}`,
          year: car.year,
        };

        return carService.createCar(newCar).pipe(
          map((createdCar) =>
            CarActions.createCarSuccess({
              id: createdCar.id,
              actionType: car.type,
              car: createdCar,
            }),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const redirectOnCreateCarSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(CarActions.createCarSuccess),
      tap(({ id, actionType }) => {
        router.navigate(['/v/cars', id], { queryParams: { source: actionType } });
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const deleteCar$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), carService = inject(CarService)) => {
    return actions$.pipe(
      ofType(CarActions.deleteCar),
      concatLatestFrom(() => store.select(selectCars)),
      switchMap(([{ id }, cars]) => {
        const updatedCars = cars.filter((car) => car.id !== id);
        return carService
          .deleteCar(id)
          .pipe(map(() => CarActions.deleteCarSuccess({ cars: updatedCars })));
      }),
    );
  },
  { functional: true },
);

export const addCars$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(CarActions.addCars),
      concatLatestFrom(() => store.select(selectCars)),
      map(([{ cars }, currentCars]) => {
        const netNewCars = [];
        const currentCarsMap = new Map(currentCars.map((car) => [car.id, car]));

        for (const car of cars) {
          if (!currentCarsMap.has(car.id)) {
            netNewCars.push(car);
          } else {
            currentCarsMap.set(car.id, { ...currentCarsMap.get(car.id)!, ...car });
          }
        }

        const updatedCars = [...currentCarsMap.values(), ...netNewCars];

        return CarActions.addCarsSuccess({ cars: updatedCars });
      }),
    );
  },
  { functional: true },
);

export const uploadCarImageForAIDataExtraction$ = createEffect(
  (actions$ = inject(Actions), fileService = inject(FileService)) => {
    return actions$.pipe(
      ofType(CarActions.uploadCarImageForAIDataExtraction),
      switchMap(({ id, file, for: forField, retryCount = 0 }) => {
        return fileService.extractDataFromImage(file, forField).pipe(
          map((data) =>
            CarActions.uploadCarImageForAIDataExtractionSuccess({
              id,
              data,
              for: forField,
            }),
          ),
          catchError(({ error }) => {
            if (retryCount !== undefined && retryCount < 3 && !error?.errorCode) {
              return timer(500).pipe(
                map(() =>
                  CarActions.uploadCarImageForAIDataExtraction({
                    id,
                    file,
                    for: forField,
                    retryCount: retryCount + 1,
                  }),
                ),
              );
            }

            return of(
              CarActions.uploadCarImageForAIDataExtractionFailure({
                error: 'Failed to extract data from image. Please try again.',
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
