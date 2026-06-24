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
  name: string;
  vin: string;
  year: string;
  dateCreated?: number;
  tagData: CarTagData;
  vinData?: CarVinData;
  tagImageUrl?: string;
  vinImageUrl?: string;
}
