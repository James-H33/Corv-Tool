import { BodyStyles } from "@common/types/body-styles.enum";

export const BODY_STYLES_MATCHER = /^(837|437|867|467)$/;

const coupeCodes = [/837/, /437/];
const convertibleCodes = [/867/, /467/];

export function decodeStyle(styleCode: string): string {
  if (coupeCodes.some((regex) => regex.test(styleCode))) {
    return BodyStyles.COUPE;
  }

  if (convertibleCodes.some((regex) => regex.test(styleCode))) {
    return BodyStyles.CONVERTIBLE;
  }

  return BodyStyles.UNKNOWN;
}
