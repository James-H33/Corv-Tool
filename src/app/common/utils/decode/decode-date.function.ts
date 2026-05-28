import { Car, CarTagData } from '@common/types/car.interface';
import { stripLetters } from '../strip-letter.function';
import { stripDigits } from '../strip-digits.function';
import { MANUFACTURING_PLANTS } from '@common/types/manufacturers.type';
import { PlantCode } from '@common/types/plant-code.enum';
import { getPlantCode } from '../strip-plant-code.function';

export function decodeDateCode(tagData: CarTagData, dateCode: string, year: string): string {
  if (dateCode.length < 2) return 'Invalid Date Code';

  function decodeDateCodeFor1963(dateCode: string): string {
    const monthLetter = stripLetters(dateCode).toUpperCase();
    const weekDigit = stripDigits(dateCode);

    const monthMap: Record<string, string> = {
      A: 'September 1962',
      B: 'October 1962',
      C: 'November 1962',
      D: 'December 1962',
      E: 'January 1963',
      F: 'February 1963',
      G: 'March 1963',
      H: 'April 1963',
      I: 'May 1963',
      J: 'June 1963',
      K: 'July 1963',
      L: 'August 1963',
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
      A: 'January 1964',
      B: 'February 1964',
      C: 'March 1964',
      D: 'April 1964',
      E: 'May 1964',
      F: 'June 1964',
      G: 'July 1964',
    };

    const stLouisPlantMonths: Record<string, string> = {
      A: 'September 1963',
      B: 'October 1963',
      C: 'November 1963',
      D: 'December 1963',
      E: 'January 1964',
      F: 'February 1964',
      G: 'March 1964',
      H: 'April 1964',
      I: 'May 1964',
      J: 'June 1964',
      K: 'July 1964',
      L: 'August 1964',
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
      A: 'August 1964',
      B: 'September 1964',
      C: 'October 1964',
      D: 'November 1964',
      E: 'December 1964',
      F: 'January 1965',
      G: 'February 1965',
      H: 'March 1965',
      I: 'April 1965',
      J: 'May 1965',
      K: 'June 1965',
      L: 'July 1965',
    };

    const month = months[monthLetter] || `Unknown Month (${monthLetter})`;

    return dayDigits ? `${month} ${dayDigits}, 1965` : month;
  }

  function decodeDateCodeFor1966(dateCode: string, tagData: Car['tagData']): string {
    const plantCode = getPlantCode(tagData.body);
    const monthLetter = stripLetters(dateCode).toUpperCase();
    const dayDigits = stripDigits(dateCode);

    const stLouisPlantMonths: Record<string, string> = {
      A: 'September 1965',
      B: 'October 1965',
      C: 'November 1965',
      D: 'December 1965',
      E: 'January 1966',
      F: 'February 1966',
      G: 'March 1966',
      H: 'April 1966',
      I: 'May 1966',
      J: 'June 1966',
      K: 'July 1966',
    };

    const smithPlantMonths: Record<string, string> = {
      A: 'August 1965',
      B: 'September 1965',
      C: 'October 1965',
      D: 'November 1965',
      E: 'December 1965',
      F: 'January 1966',
      G: 'February 1966',
      H: 'March 1966',
      I: 'April 1966',
      J: 'May 1966',
      K: 'June 1966',
      L: 'July 1966',
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
      A: 'August 1966',
      B: 'September 1966',
      C: 'October 1966',
      D: 'November 1966',
      E: 'December 1966',
      F: 'January 1967',
      G: 'February 1967',
      H: 'March 1967',
      I: 'April 1967',
      J: 'May 1967',
      K: 'June 1967',
      L: 'July 1967',
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
