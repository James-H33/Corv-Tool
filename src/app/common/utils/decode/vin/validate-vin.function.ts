export function validateVin(
  vin: string,
  year: string,
): { isValid: boolean; invalidReason?: string } {
  if (vin.length < 12) {
    return { isValid: false, invalidReason: 'VIN is too short' };
  }

  const steps = getStepsBasedOnYear(vin, year);

  let step = 0;

  while (step < steps.length) {
    const { start, end, validator } = steps[step];
    const segment = vin.substring(start, end);
    const isValid = validator(segment);

    if (!isValid) {
      return { isValid: false, invalidReason: steps[step].invalidReason };
    }

    step++;
  }

  return { isValid: true };
}

function getStepsBasedOnYear(
  vin: string,
  year: string,
): {
  start: number;
  end: number;
  validator: (segment: string) => boolean;
  invalidReason: string;
}[] {
  if (year === '1963' || year === '1964') {
    return [
      {
        start: 0,
        end: 1,
        validator: (segment) => /^[3|4]$/.test(segment),
        invalidReason: 'Model Year must be 3 or 4 for 1963 and 1964',
      },
      {
        start: 1,
        end: 3,
        validator: (segment) => /^[08]{2}$/.test(segment),
        invalidReason: 'Series must be 2 digits "08"',
      },
      {
        start: 3,
        end: 5,
        validator: (segment) => /^(37|67)$/.test(segment),
        invalidReason: 'Body Style must be 2 digits "37" or "67"',
      },
      {
        start: 5,
        end: 6,
        validator: (segment) => /^[sS]$/.test(segment),
        invalidReason: 'Assembly Plant must be 1 letter : "S"',
      },
      {
        start: 6,
        end: vin.length,
        validator: (segment) => /^[0-9]{6}$/.test(segment),
        invalidReason: 'Production Sequence must be 6 digits for 1963 and 1964',
      },
    ];
  } else {
    return [
      {
        start: 0,
        end: 1,
        validator: (segment) => /^[1]$/.test(segment),
        invalidReason: 'Make must be 1 for 1965 and later',
      },
      {
        start: 1,
        end: 3,
        validator: (segment) => /^94$/.test(segment),
        invalidReason: 'Series must be 2 digits for 1965 and later : "94"',
      },
      {
        start: 3,
        end: 5,
        validator: (segment) => /^(37|67)$/.test(segment),
        invalidReason: 'Body Style must be 2 digits "37" or "67"',
      },
      {
        start: 5,
        end: 6,
        validator: (segment) => /^[567]$/.test(segment),
        invalidReason: 'Model Year must be 1 digit and is "5" for 1965, "6" for 1966, "7" for 1967',
      },
      {
        start: 6,
        end: 7,
        validator: (segment) => /^[sS]$/.test(segment),
        invalidReason: 'Assembly Plant must be 1 letter : "S"',
      },
      {
        start: 7,
        end: vin.length,
        validator: (segment) => /^[0-9]{6}$/.test(segment),
        invalidReason: 'Production Sequence must be 6 digits for 1965 and later',
      },
    ];
  }
}
