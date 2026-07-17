import { CarTagData } from '@common/types/car.interface';
import { stripLetters } from '../../strip-letter.function';
import { MANUFACTURING_PLANTS } from '@common/types/manufacturers.type';

export function decodeBody(
  tagData: CarTagData,
  year: string,
): { value: string; error: boolean } | null {
  const bodyCode = stripLetters(tagData.body);

  if (year === '1963') {
    if (bodyCode.includes('A') || bodyCode.includes('S')) {
      return { value: 'Unknown Body', error: true };
    }

    return { value: MANUFACTURING_PLANTS['S'], error: false };
  }

  // 64's mid way through the year started showing an S or A but not all of them.
  if (year === '1964') {
    if (bodyCode.includes('A')) {
      return { value: MANUFACTURING_PLANTS['A'], error: false };
    } else if (bodyCode.includes('S')) {
      return { value: MANUFACTURING_PLANTS['S'], error: false };
    } else {
      return { value: MANUFACTURING_PLANTS['S'], error: false };
    }
  }

  if (bodyCode.includes('A')) {
    return { value: MANUFACTURING_PLANTS['A'], error: false };
  } else if (bodyCode.includes('S')) {
    return { value: MANUFACTURING_PLANTS['S'], error: false };
  } else {
    return {
      value: 'Error: 65\'s and later bodies require an "A" or "S" -- Check Inputs',
      error: true,
    };
  }
}
