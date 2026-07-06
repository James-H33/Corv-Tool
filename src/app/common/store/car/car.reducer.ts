import { Car, CarTagData } from '@common/types/car.interface';
import { FormTypes } from '@common/types/form-types.enum';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CarActions } from './car.actions';

export interface ExtractedData {
  data: CarTagData | string;
  imageId: string;
}

interface CarState {
  cars: Car[];
  extractedData: ExtractedData | null;
  activeForm: FormTypes | null;
  extractingDataFor: FormTypes | null;
}

export const initialCarState: CarState = {
  cars: [],
  extractedData: null,
  activeForm: null,
  extractingDataFor: null,
};

export const carFeature = createFeature({
  name: 'car',
  reducer: createReducer<CarState>(
    initialCarState,

    on(CarActions.loadCarsSuccess, (state, { cars }) => ({
      ...state,
      cars,
    })),

    on(CarActions.loadCarByIdSuccess, (state, { cars }) => ({
      ...state,
      cars,
    })),

    on(CarActions.addCarsSuccess, (state, { cars }) => ({
      ...state,
      cars,
    })),

    on(CarActions.createCarSuccess, (state, { car }) => ({
      ...state,
      cars: [...state.cars, car],
    })),

    on(CarActions.deleteCarSuccess, (state, { cars }) => ({
      ...state,
      cars,
    })),

    on(CarActions.updateCarSuccess, (state, { cars }) => ({
      ...state,
      cars,
    })),

    on(CarActions.uploadCarImageForAIDataExtraction, (state, { for: forForm }) => ({
      ...state,
      extractingDataFor: forForm,
    })),

    on(CarActions.uploadCarImageForAIDataExtractionSuccess, (state, { data, for: forForm }) => ({
      ...state,
      extractedData: data,
      activeForm: forForm,
      extractingDataFor: null,
    })),

    on(CarActions.uploadCarImageForAIDataExtractionFailure, (state) => ({
      ...state,
      extractedData: null,
      activeForm: null,
      extractingDataFor: null,
    })),


    on(CarActions.setActiveForm, (state, { formType }) => ({
      ...state,
      activeForm: formType,
    })),

    on(CarActions.clearFormState, (state) => ({
      ...state,
      extractedData: null,
      activeForm: null,
      extractingDataFor: null,
    }))
  ),
});
