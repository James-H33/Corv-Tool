import { AddCar, AddCarActionType } from '@common/types/add-car.interface';
import { Car } from '@common/types/car.interface';
import { ExtractedCarImageData } from '@common/types/extracted-car-image-data.interface';
import { FormTypes } from '@common/types/form-types.enum';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CarActions = createActionGroup({
  source: 'Car',
  events: {
    createCar: props<{ car: AddCar }>(),
    createCarSuccess: props<{ id: string; actionType: AddCarActionType; car: Car }>(),

    deleteCar: props<{ id: string }>(),
    deleteCarSuccess: props<{ cars: Car[] }>(),

    loadCars: emptyProps(),
    loadCarsSuccess: props<{ cars: Car[] }>(),

    loadCarById: props<{ id: string }>(),
    loadCarByIdSuccess: props<{ cars: Car[] }>(),

    updateCar: props<{ id: string; data: Partial<Car> }>(),
    updateCarSuccess: props<{ cars: Car[] }>(),

    uploadCarImageForAIDataExtraction: props<{ id: string; file: File; for: FormTypes }>(),
    uploadCarImageForAIDataExtractionSuccess: props<{
      id: string;
      data: ExtractedCarImageData;
      for: FormTypes;
    }>(),
    uploadCarImageForAIDataExtractionFailure: props<{ error: unknown; for?: FormTypes | null }>(),

    setActiveForm: props<{ formType: FormTypes | null }>(),

    addCars: props<{ cars: Car[] }>(),
    addCarsSuccess: props<{ cars: Car[] }>(),

    // loadCarsFailure: props<{ error: any }>(),
  },
});
