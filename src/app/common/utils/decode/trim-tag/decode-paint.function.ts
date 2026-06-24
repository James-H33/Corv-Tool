import { CarTagData } from '@common/types/car.interface';
import { getPlantCode } from '../../strip-plant-code.function';
import { stripLetters } from '../../strip-letter.function';
import { stripDigits } from '../../strip-digits.function';

export function decodePaintCode(carTagData: CarTagData, year: string): string {
  const paintCode = stripPaintCode(carTagData);
  const plantCode = getPlantCode(carTagData.body);

  if (!paintCode) {
    return 'Unknown Paint Code';
  }

  const paintMap1963: Record<string, string> = {
    '900A': 'Tuxedo Black',
    '912A': 'Silver Blue',
    '916A': 'Daytona Blue',
    '923A': 'Riverside Red',
    '932A': 'Saddle Tan',
    '936A': 'Ermine White',
    '941A': 'Sebring Silver',
  };

  const paintMap1964: Record<string, Record<string, string>> = {
    A: {
      '900A': 'Tuxedo Black',
      '912A': 'Silver Blue',
      '916A': 'Daytona Blue',
      '923A': 'Riverside Red',
      '932A': 'Saddle Tan',
      '936A': 'Ermine White',
      '940A': 'Satin Silver',
    },
    S: {
      '900AA': 'Tuxedo Black',
      '912AA': 'Silver Blue',
      '916AA': 'Daytona Blue',
      '923AA': 'Riverside Red',
      '932AA': 'Saddle Tan',
      '936AA': 'Ermine White',
      '940AA': 'Satin Silver',
    },
  };

  const paintMap1965: Record<string, Record<string, string>> = {
    A: {
      'AA': 'Tuxedo Black',
      'CC': 'Ermine White',
      'FF': 'Nassau Blue',
      'GG': 'Glen Green',
      'MM': 'Milano Maroon',
      'UU': 'Rally Red',
      'XX': 'Goldwood Yellow',
      'QQ': 'Silver Pearl',
    },
    S: {
      '900AA': 'Tuxedo Black',
      '900CC': 'Ermine White',
      '900FF': 'Nassau Blue',
      '900GG': 'Glen Green',
      '900MM': 'Milano Maroon',
      '900UU': 'Rally Red',
      '900XX': 'Goldwood Yellow',
      '900QQ': 'Silver Pearl',
    },
  };

  const paintMap1966: Record<string, Record<string, string>> = {
    A: {
      '900': 'Tuxedo Black',
      '972': 'Ermine White',
      '974': 'Rally Red',
      '976': 'Nassau Blue',
      '978': 'Laguna Blue',
      '980': 'Trophy Blue',
      '982': 'Mosport Green',
      '984': 'Sunfire Yellow',
      '986': 'Silver Pearl',
      '988': 'Milano Maroon',
    },
    S: {
      '900AA': 'Tuxedo Black',
      '972AA': 'Ermine White',
      '974AA': 'Rally Red',
      '976AA': 'Nassau Blue',
      '978AA': 'Laguna Blue',
      '980AA': 'Trophy Blue',
      '982AA': 'Mosport Green',
      '984AA': 'Sunfire Yellow',
      '986AA': 'Silver Pearl',
      '988AA': 'Milano Maroon',
    },
  };

  const paintMap1967: Record<string, Record<string, string>> = {
    A: {
      '900': 'Tuxedo Black',
      '972': 'Ermine White',
      '974': 'Rally Red',
      '976': 'Marina Blue',
      '977': 'Lyndale Blue',
      '980': 'Elkhart Blue',
      '983': 'Goodwood Green',
      '984': 'Sunfire Yellow',
      '986': 'Silver Pearl',
      '988': 'Marlboro Maroon',
    },
    S: {
      '900AA': 'Tuxedo Black',
      '972AA': 'Ermine White',
      '974AA': 'Rally Red',
      '976AA': 'Marina Blue',
      '977AA': 'Lyndale Blue',
      '980AA': 'Elkhart Blue',
      '983AA': 'Goodwood Green',
      '984AA': 'Sunfire Yellow',
      '986AA': 'Silver Pearl',
      '988AA': 'Marlboro Maroon',
    },
  };

  let result;

  switch (year) {
    case '1963':
      result = paintMap1963[paintCode];
      break;
    case '1964':
      result = paintMap1964[plantCode]?.[paintCode];
      break;
    case '1965':
      result = paintMap1965[plantCode]?.[paintCode];
      break;
    case '1966':
      result = paintMap1966[plantCode]?.[paintCode];
      break;
    case '1967':
      result = paintMap1967[plantCode]?.[paintCode];
      break;
    default:
      result = 'Unsupported Year';
  }

  return result ?? 'Unknown Paint Code';
}

function stripPaintCode(carTagData: CarTagData): string {
  const letters = stripLetters(carTagData.paint).trim().toUpperCase();
  const digits = stripDigits(carTagData.paint).trim();

  return `${digits}${letters}`;
}
