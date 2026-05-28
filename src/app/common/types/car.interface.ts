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
  engine: string;
  bodyStyle: string;
  modelYear: string;
  assemblyPlant: string;
  productionSequence: string;
}

export interface Car {
  id: string;
  vin: string;
  tagData: CarTagData;
  vinData?: CarVinData;
}

const exampleCar: Car = {
  id: '1',
  vin: '1234567890123456',
  tagData: {
    body: 'A-7681',
    trim: '418',
    style: '66 467',
    paint: 'F-F',
    dateCode: 'K06',
  },
  vinData: undefined,
}
