// import { Car } from '@common/types/car.interface';

import { CarTagData } from "@common/types/car.interface";
import { decodeBody } from "./decode-body.function";
import { decodeDateCode } from "./decode-date.function";
import { decodePaintCode } from "./decode-paint.function";
import { decodeStyle } from "./decode-style.function";
import { decodeTrim } from "./decode-trim.function";
import { Info } from "@common/types/info.interface";

export function trimTagDecoder(
  tagData: CarTagData,
  year: string,
): Record<string, Info> {
  const result = {
    body: { value: tagData.body, description: 'Unknown Body' },
    trim: { value: tagData.trim, description: 'Unknown Trim' },
    style: { value: tagData.style, description: 'Unknown Style' },
    paint: { value: tagData.paint, description: 'Unknown Paint' },
    dateCode: { value: tagData.dateCode, description: 'Unknown Date Code' },
  };

  const bodyDescription = decodeBody(tagData);
  const trimDescription = decodeTrim(tagData, year);
  const styleDescription = decodeStyle(tagData.style);
  const paintDescription = decodePaintCode(tagData, year);
  const dateCodeDescription = decodeDateCode(tagData, tagData.dateCode, year);

  if (bodyDescription) {
    result.body.description = bodyDescription;
  }

  if (trimDescription) {
    result.trim.description = trimDescription;
  }

  if (styleDescription) {
    result.style.description = styleDescription;
  }

  if (paintDescription) {
    result.paint.description = paintDescription;
  }

  if (dateCodeDescription) {
    result.dateCode.description = dateCodeDescription;
  }

  return result;
}
