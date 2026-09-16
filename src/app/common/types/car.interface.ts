import { User } from './user.interface';

export interface CarTagData {
  body: string;
  trim: string;
  style: string;
  paint: string;
  dateCode: string;
}

export interface CarVinData {
  make: string;
  series: string;
  bodyStyle: string;
  modelYear: string;
  assemblyPlant: string;
  productionSequence: string;
}

export interface Car {
  id: string;
  userId: string;
  name: string;
  vin: string;
  year: string;
  tagData: CarTagData;
  user?: User;
  dateCreated?: number;
  vinData?: CarVinData;
  tagImageUrl?: string;
  vinImageUrl?: string;
}
