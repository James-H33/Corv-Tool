import { BodyStyles } from '@common/types/body-styles.enum';
import { Info } from '@common/types/info.interface';
import { PlantCode, Plants } from '@common/types/plant-code.enum';

export function decodeVin(vin: string, year: string): Record<string, Info> {
  const vinData: Record<string, Info> = {
    make: { value: '', description: 'Unknown Make' },
    series: { value: '', description: 'Unknown Series' },
    bodyStyle: { value: '', description: 'Unknown Body Style' },
    modelYear: { value: '', description: 'Unknown Model Year' },
    assemblyPlant: { value: '', description: 'Unknown Assembly Plant' },
    productionSequence: {
      value: '',
      description: 'Unknown Production Sequence',
    },
  };

  if (vin.length < 12) {
    return vinData;
  }

  /**
   * 1963 Ranges
   30837S100001
   30837S121513
   30867S100001
   30867S121513

   // 1964+
   194675S119989
   */

  let make = vin.substring(0, 1);
  let series = vin.substring(1, 3);
  let bodyStyle = vin.substring(3, 5);
  let modelYear = vin.substring(5, 6);
  let assemblyPlant = vin.substring(6, 7);
  let productionSequence = vin.substring(7);

  if (year === '1963' || year === '1964') {
    make = 'Not Applicable';
    modelYear = vin.substring(0, 1);
    series = vin.substring(1, 3);
    bodyStyle = vin.substring(3, 5);
    assemblyPlant = vin.substring(5, 6);
    productionSequence = vin.substring(6);
  }

  vinData['make'].value = make; // 1
  vinData['series'].value = series; // 2-3
  vinData['bodyStyle'].value = bodyStyle; // 4-5
  vinData['modelYear'].value = modelYear; // 6
  vinData['assemblyPlant'].value = assemblyPlant; // 7
  vinData['productionSequence'].value = productionSequence;

  vinData['make'].description = 'Chevrolet';
  vinData['modelYear'].description = getModelYearDescription(modelYear, year);

  vinData['series'].description = getSeriesDescription(series);
  vinData['bodyStyle'].description = getBodyStyleDescription(bodyStyle);
  vinData['assemblyPlant'].description = getAssemblyPlantDescription(assemblyPlant);

  vinData['productionSequence'].description = productionSequence;

  return vinData;
}

function getModelYearDescription(code: string, year: string): string {
  const yearMap: Record<string, string> = {
    '3': '1963',
    '4': '1964',
    '5': '1965',
    '6': '1966',
    '7': '1967',
  };

  return yearMap[code] || year;
}

function getAssemblyPlantDescription(code: string): string {
  switch (code) {
    case PlantCode.S:
      return Plants.STLOUIS;
    case PlantCode.A:
      return Plants.AOSMITH;
    default:
      return 'Unknown Assembly Plant';
  }
}

function getSeriesDescription(code: string): string {
  switch (code) {
    case '08':
    case '94':
      return 'Corvette';
    default:
      return 'Unknown Series';
  }
}

function getBodyStyleDescription(code: string): string {
  switch (code) {
    case '37':
      return BodyStyles.COUPE;
    case '67':
      return BodyStyles.CONVERTIBLE;
    default:
      return 'Unknown Body Style';
  }
}
