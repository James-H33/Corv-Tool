import { decodeTrim } from '../decode-trim.function';

describe('decodeTrim', () => {
  describe('Decode 1963 Trim Codes', () => {
    const cases: [string, string][] = [
      ['STD', 'Black Vinyl'],
      ['BLK', 'Black Vinyl'],
      ['490C', 'Red Vinyl'],
      ['490L', 'Red Vinyl'],
      ['490D', 'Red Vinyl'],
      ['490A', 'Blue Vinyl'],
      ['490XK', 'Saddle Vinyl'],
      ['898A', 'Saddle Leather'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`${trim} - ${expected}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1963')).toBe(expected);
      });
    });
  });

  describe('Decode 1964 Trim Codes', () => {
    const cases: [string, string][] = [
      ['490GA', 'Red Vinyl'],

      ['490JA', 'Blue Vinyl'],

      ['490CA', 'Saddle Vinyl'],

      ['490DA', 'Silver Vinyl'],

      ['491AA', 'Silver Vinyl, Black Dash'],

      ['491BA', 'Silver Vinyl, Blue Dash'],

      ['491CA', 'White Vinyl, Black Dash'],

      ['491DA', 'White Vinyl, Red Dash'],

      ['491GA', 'White Vinyl, Blue Dash'],

      ['491HA', 'White Vinyl, Saddle Dash'],

      ['898AA', 'Black Leather'],

      ['898CA', 'Saddle Leather'],

      ['898GA', 'Saddle Leather'],

      ['898HJ', 'Saddle Leather'],

      ['898EA', 'Red Leather'],

      ['898LA', 'Red Leather'],

      ['898MJ', 'Red Leather'],

      ['898JA', 'Blue Leather'],

      ['898NA', 'Blue Leather'],

      ['898PL', 'Blue Leather'],

      ['899AA', 'Silver Leather, Black Dash'],

      ['899BA', 'Silver Leather, Blue Dash'],

      ['899CA', 'White Leather, Black Dash'],

      ['899GA', 'White Leather, Blue Dash'],

      ['899HA', 'White Leather, Saddle Dash'],

      ['899DA', 'White Leather, Red Dash'],

      ['490GA', 'Red Vinyl'],

      ['490HB', 'Red Vinyl'],

      ['490JA', 'Blue Vinyl'],

      ['490KG', 'Blue Vinyl'],

      ['490CA', 'Saddle Vinyl'],

      ['491MA', 'Silver Vinyl, Blue Dash'],

      ['491PA', 'White Vinyl, Red Dash'],

      ['491RA', 'White Vinyl, Blue Dash'],

      ['491TA', 'White Vinyl, Saddle Dash'],

      ['899MA', 'Silver Leather, Blue Dash'],

      ['899RA', 'White Leather, Blue Dash'],

      ['899TA', 'White Leather, Saddle Dash'],

      ['899PA', 'White Leather, Red Dash'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`${trim} - ${expected}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1964')).toBe(expected);
      });
    });
  });

  describe('Decode 1965 Trim Codes', () => {
    const cases: [string, string][] = [
      ['STD', 'Black Vinyl'],
      ['402', 'Black Leather'],
      ['407', 'Red Vinyl'],
      ['408', 'Red Leather'],
      ['414', 'Blue Vinyl'],
      ['415', 'Blue Leather'],
      ['420', 'Saddle Vinyl'],
      ['421', 'Saddle Leather'],
      ['426', 'Silver/Black Vinyl'],
      ['427', 'Silver/Black Leather'],
      ['430', 'Green Vinyl'],
      ['431', 'Green Leather'],
      ['435', 'Maroon Vinyl'],
      ['436', 'Maroon Leather'],
      ['437', 'White/Black Vinyl'],
      ['438', 'White/Black Leather'],
      ['443', 'White/Red Vinyl'],
      ['444', 'White/Red Leather'],
      ['450', 'White/Blue Vinyl'],
      ['451', 'White/Blue Leather'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`should return ${expected} for trim code ${trim}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1965')).toBe(expected);
      });
    });
  });

  describe('Decode 1966 Trim Codes', () => {
    const cases: [string, string][] = [
      ['STD', 'Black Vinyl'],
      ['402', 'Black Leather'],
      ['407', 'Red Vinyl'],
      ['408', 'Red Leather'],
      ['414', 'Bright Blue Vinyl'],
      ['415', 'Bright Blue Leather'],
      ['418', 'Dark Blue Vinyl'],
      ['419', 'Dark Blue Leather'],
      ['420', 'Saddle Vinyl'],
      ['421', 'Saddle Leather'],
      ['426', 'Silver Vinyl'],
      ['427', 'Silver Leather'],
      ['430', 'Green Vinyl'],
      ['437', 'White Vinyl'],
      ['438', 'White Leather'],
      ['450', 'White/Blue Vinyl'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`should return ${expected} for trim code ${trim}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1966')).toBe(expected);
      });
    });
  });

  describe('Decode 1967 Trim Codes', () => {
    const cases: [string, string][] = [
      ['STD', 'Black Vinyl'],
      ['402', 'Black Leather'],
      ['407', 'Red Vinyl'],
      ['408', 'Red Leather'],
      ['414', 'Bright Blue Vinyl'],
      ['415', 'Bright Blue Leather'],
      ['418', 'Teal Blue Vinyl'],
      ['419', 'Teal Blue Leather'],
      ['420', 'Saddle Vinyl'],
      ['421', 'Saddle Leather'],
      ['430', 'Green Vinyl'],
      ['450', 'White/Blue Vinyl'],
      ['455', 'White/Black Vinyl'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`should return ${expected} for trim code ${trim}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1967')).toBe(expected);
      });
    });
  });
});
