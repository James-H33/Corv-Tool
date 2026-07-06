import { Car } from '@common/types/car.interface';
import { carFeature, ExtractedData } from './car.reducer';
import { createSelector } from '@ngrx/store';

export const {
  selectCars,
  selectExtractedData,
  selectActiveForm,
 } = carFeature;

export const selectCarById = (id: string) => createSelector(
  selectCars,
  (cars: Car[]) => cars.find(car => car.id === id)
);

export const selectCarsMap = createSelector(
  selectCars,
  (cars: Car[]) => {
    const carsMap: Record<string, Car> = {};

    for (const car of cars) {
      carsMap[car.id] = car;
    }

    return carsMap;
  }
);

export const selectExtractedDataByType = (type: 'vin' | 'tag') => createSelector(
  selectExtractedData,
  selectActiveForm,
  (extractedData: ExtractedData | null, activeForm: string | null) => {
    if (!activeForm) {
      return null;
    }

    if (type === 'vin' && activeForm === 'vin') {
      return extractedData;
    }

    if (type === 'tag' && activeForm === 'tag') {
      return extractedData;
    }

    return null;
  }
)
