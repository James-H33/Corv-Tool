import { CarTagData } from '@common/types/car.interface';
import { decodeBody } from './decode-body.function';
import { decodeDateCode } from './decode-date.function';
import { decodePaintCode } from './decode-paint.function';
import { decodeStyle } from './decode-style.function';
import { decodeTrim } from './decode-trim.function';
import { Info } from '@common/types/info.interface';

export function trimTagDecoder(tagData: CarTagData, year: string): Record<string, Info> {
  const result = {
    body: { value: tagData.body, description: 'Unknown Body', error: false },
    trim: { value: tagData.trim, description: 'Unknown Trim', error: false },
    style: { value: tagData.style, description: 'Unknown Style', error: false },
    paint: { value: tagData.paint, description: 'Unknown Paint', error: false },
    dateCode: { value: tagData.dateCode, description: 'Unknown Date Code', error: false },
  };

  const bodyResult = decodeBody(tagData, year);
  const trimResult = decodeTrim(tagData, year);
  const styleResult = decodeStyle(tagData.style);
  const paintResult = decodePaintCode(tagData, year);
  const dateCodeResult = decodeDateCode(tagData, tagData.dateCode, year);

  if (bodyResult) {
    result.body.description = bodyResult.value;
    result.body.error = bodyResult.error;
  }

  if (trimResult) {
    result.trim.description = trimResult.value;
    result.trim.error = trimResult.error;
  }

  if (styleResult) {
    result.style.description = styleResult.value;
    result.style.error = styleResult.error;
  }

  if (paintResult) {
    result.paint.description = paintResult.value;
    result.paint.error = paintResult.error;
  }

  if (dateCodeResult) {
    result.dateCode.description = dateCodeResult.value;
    result.dateCode.error = dateCodeResult.error;
  }

  return result;
}
