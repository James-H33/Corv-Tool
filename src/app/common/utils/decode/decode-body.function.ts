import { CarTagData } from '@common/types/car.interface';
import { stripLetters } from '../strip-letter.function';
import { MANUFACTURING_PLANTS } from '@common/types/manufacturers.type';

// Output: A = A.O. SMITH, S = ST. LOUIS, blank or unknown = S
export function decodeBody(tagData: CarTagData): string {
  const bodyCode = stripLetters(tagData.body);

  if (bodyCode.includes('A')) {
    return MANUFACTURING_PLANTS['A'];
  } else if (bodyCode.includes('S')) {
    return MANUFACTURING_PLANTS['S'];
  } else {
    return MANUFACTURING_PLANTS['S']; // Default to ST. LOUIS if no letter is found
  }
}
