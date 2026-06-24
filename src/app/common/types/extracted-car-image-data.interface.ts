import { CarTagData } from './car.interface';

export interface ExtractedCarImageData {
  data: CarTagData | string;
  imageId: string;
}
