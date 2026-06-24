import { CarTagData } from '@common/types/car.interface';
import { regExp63, regExp64, regExp65, regExp66, regExp67 } from '@common/types/trim-codes';
import { stripLetters } from '../../strip-letter.function';
import { stripDigits } from '../../strip-digits.function';

export function decodeTrim(tagData: CarTagData, year: string): string {
  let trimCode = tagData.trim.trim().toUpperCase();

  if (!trimCode) {
    return 'Unknown Trim';
  }

  let regExpArray: [RegExp, string][] = [];

  switch (year) {
    case '1963':
      regExpArray = regExp63;
      break;
    case '1964':
      trimCode = parse64TrimCode(trimCode);
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

export function parse64TrimCode(trimCode: string): string {
  let letters = stripLetters(trimCode).toUpperCase();
  const digits = stripDigits(trimCode);

  if (letters.length === 1) {
    letters = `${letters}A`;
  }

  return `${digits}${letters}`;
}
