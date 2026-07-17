import { BodyStyles } from '@common/types/body-styles.enum';

export const BODY_STYLES_MATCHER = /^(837|437|867|467)$/;

const coupeCodes = [/837/, /437/];
const convertibleCodes = [/867/, /467/];

export function decodeStyle(styleCode: string): { value: string; error: boolean } {
  if (coupeCodes.some((regex) => regex.test(styleCode))) {
    return { value: BodyStyles.COUPE, error: false };
  }

  if (convertibleCodes.some((regex) => regex.test(styleCode))) {
    return { value: BodyStyles.CONVERTIBLE, error: false };
  }

  return { value: BodyStyles.UNKNOWN, error: true };
}
