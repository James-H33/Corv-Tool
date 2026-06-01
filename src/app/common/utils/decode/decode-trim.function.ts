import { CarTagData } from '@common/types/car.interface';
import { regExp63, regExp64, regExp65, regExp66, regExp67 } from '@common/types/trim-codes';

export function decodeTrim(tagData: CarTagData, year: string): string {
  const trimCode = tagData.trim.trim().toUpperCase();

  if (!trimCode) {
    return 'Unknown Trim';
  }

  let regExpArray: [RegExp, string][] = [];

  switch (year) {
    case '1963':
      regExpArray = regExp63;
      break;
    case '1964':
      regExpArray = regExp64;
      break;
    case '1965':
      regExpArray = regExp65;
      break;
    case '1966':
      regExpArray = regExp66;
      break;
    case '1967':
      regExpArray = regExp67;
      break;
    default:
      regExpArray = [];
      break;
  }

  for (const [regex, description] of regExpArray) {
    if (regex.test(trimCode)) {
      return description;
    }
  }

  return 'Unknown Trim';
}
