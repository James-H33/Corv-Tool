export interface AddCar {
  name: string;
  year: string;
  type: AddCarActionType;
}

export enum AddCarActionType {
  ManualEntry = 'manual',
  Vin = 'vin',
  TrimTag = 'trim',
}
