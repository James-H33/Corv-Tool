import { CarTagData } from '@common/types/car.interface';
import { stripLetters } from '../../strip-letter.function';
import { MANUFACTURING_PLANTS } from '@common/types/manufacturers.type';

export function decodeBody(tagData: CarTagData, year: string): string {
  const bodyCode = stripLetters(tagData.body);

  // 64's mid way through the year started showing an S or A but not all of them.
  if (year === '1963') {
    if (bodyCode.includes('A') || bodyCode.includes('S')) {
      return 'Unknown Body';
    }

    return MANUFACTURING_PLANTS['S'];
  }

  if (year === '1964') {
    return 'This is a 1964 body';
  }

  if (bodyCode.includes('A')) {
    return MANUFACTURING_PLANTS['A'];
  } else if (bodyCode.includes('S')) {
    return MANUFACTURING_PLANTS['S'];
  } else {
    return 'Unknown Body';
  }
}
