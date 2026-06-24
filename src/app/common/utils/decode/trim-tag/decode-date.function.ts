import { Car, CarTagData } from '@common/types/car.interface';
import { stripLetters } from '../../strip-letter.function';
import { stripDigits } from '../../strip-digits.function';
import { MANUFACTURING_PLANTS } from '@common/types/manufacturers.type';
import { PlantCode } from '@common/types/plant-code.enum';
import { getPlantCode } from '../../strip-plant-code.function';

export function decodeDateCode(tagData: CarTagData, dateCode: string, year: string): string {
  if (dateCode.length < 2) return 'Invalid Date Code';

  function decodeDateCodeFor1963(dateCode: string): string {
    const monthLetter = stripLetters(dateCode).toUpperCase();
    const weekDigit = stripDigits(dateCode);

    const monthMap: Record<string, string> = {
      A: 'September',
      B: 'October',
      C: 'November',
      D: 'December',
      E: 'January',
      F: 'February',
      G: 'March',
      H: 'April',
      I: 'May',
      J: 'June',
      K: 'July',
      L: 'August',
    };

    const weeks: Record<string, string> = {
      '1': '1st Week',
      '2': '2nd Week',
      '3': '3rd Week',
      '4': '4th Week',
      '5': '5th Week',
    };

    const month = monthMap[monthLetter] || `Unknown Month (${monthLetter})`;
    const week = weeks[weekDigit] || `Unknown Week (${weekDigit})`;

    return `${month}, ${week}`;
  }

  function decodeDateCodeFor1964(dateCode: string, tagData: Car['tagData']): string {
    const plantCode = getPlantCode(tagData.body);
    const monthLetter = stripLetters(dateCode).toUpperCase();
    const dayDigits = stripDigits(dateCode);

    const smithPlantMonths: Record<string, string> = {
      A: 'January',
      B: 'February',
      C: 'March',
      D: 'April',
      E: 'May',
      F: 'June',
      G: 'July',
    };

    const stLouisPlantMonths: Record<string, string> = {
      A: 'September',
      B: 'October',
      C: 'November',
      D: 'December',
      E: 'January',
      F: 'February',
      G: 'March',
      H: 'April',
      I: 'May',
      J: 'June',
      K: 'July',
      L: 'August',
    };

    if (!(plantCode in MANUFACTURING_PLANTS)) {
      return `Unknown Plant (${plantCode})`;
    }

    if (plantCode === PlantCode.A) {
      const month = smithPlantMonths[monthLetter] || `Unknown Month (${monthLetter})`;

      return dayDigits ? `${month} ${dayDigits}` : month;
    } else {
      const month = stLouisPlantMonths[monthLetter] || `Unknown Month (${monthLetter})`;
      return dayDigits ? `${month} ${dayDigits}` : month;
    }
  }

  function decodeDateCodeFor1965(dateCode: string): string {
    const monthLetter = stripLetters(dateCode).toUpperCase();
    const dayDigits = stripDigits(dateCode);

    const months: Record<string, string> = {
      A: 'August',
      B: 'September',
      C: 'October',
      D: 'November',
      E: 'December',
      F: 'January',
      G: 'February',
      H: 'March',
      I: 'April',
      J: 'May',
      K: 'June',
      L: 'July',
    };

    const month = months[monthLetter] || `Unknown Month (${monthLetter})`;

    return dayDigits ? `${month} ${dayDigits}` : month;
  }

  function decodeDateCodeFor1966(dateCode: string, tagData: Car['tagData']): string {
    const plantCode = getPlantCode(tagData.body);
    const monthLetter = stripLetters(dateCode).toUpperCase();
    const dayDigits = stripDigits(dateCode);

    const stLouisPlantMonths: Record<string, string> = {
      A: 'September',
      B: 'October',
      C: 'November',
      D: 'December',
      E: 'January',
      F: 'February',
      G: 'March',
      H: 'April',
      I: 'May',
      J: 'June',
      K: 'July',
    };

    const smithPlantMonths: Record<string, string> = {
      A: 'August',
      B: 'September',
      C: 'October',
      D: 'November',
      E: 'December',
      F: 'January',
      G: 'February',
      H: 'March',
      I: 'April',
      J: 'May',
      K: 'June',
      L: 'July',
    };

    if (plantCode === PlantCode.A) {
      const month = smithPlantMonths[monthLetter] || `Unknown Month (${monthLetter})`;

      return dayDigits ? `${month} ${dayDigits}` : month;
    } else {
      const month = stLouisPlantMonths[monthLetter] || `Unknown Month (${monthLetter})`;
      return dayDigits ? `${month} ${dayDigits}` : month;
    }
  }

  function decodeDateCodeFor1967(dateCode: string): string {
    const monthLetter = stripLetters(dateCode).toUpperCase();
    const dayDigits = stripDigits(dateCode);

    const months: Record<string, string> = {
      A: 'August',
      B: 'September',
      C: 'October',
      D: 'November',
      E: 'December',
      F: 'January',
      G: 'February',
      H: 'March',
      I: 'April',
      J: 'May',
      K: 'June',
      L: 'July',
    };

    const month = months[monthLetter] || `Unknown Month (${monthLetter})`;

    return dayDigits ? `${month} ${dayDigits}` : month;
  }

  switch (year) {
    case '1963':
      return decodeDateCodeFor1963(dateCode);
    case '1964':
      return decodeDateCodeFor1964(dateCode, tagData);
    case '1965':
      return decodeDateCodeFor1965(dateCode);
    case '1966':
      return decodeDateCodeFor1966(dateCode, tagData);
    case '1967':
      return decodeDateCodeFor1967(dateCode);
    default:
      return 'Unsupported Year';
  }
}
