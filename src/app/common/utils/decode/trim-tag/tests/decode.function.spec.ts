import { Plants } from '@common/types/plant-code.enum';
import { BodyStyles } from '@common/types/body-styles.enum';
import { trimTagDecoder } from '../decode.function';

describe('Decode Function', () => {
  describe('Trim Tag Decoder for 1963', () => {
    it('Decodes tag data for a 1963 car: 1', () => {
      const tagData = {
        body: '7357',
        trim: '490L',
        style: '63 837',
        paint: '936A',
        dateCode: 'H4',
      };

      const result = trimTagDecoder(tagData, '1963');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('Red Vinyl');
      expect(result['style'].description).toBe(BodyStyles.COUPE);
      expect(result['paint'].description).toBe('Ermine White');
      expect(result['dateCode'].description).toBe('April, 4th Week');
    });

    it('Decodes tag data for a 1963 car: 2', () => {
      const tagData = {
        body: '7427',
        trim: 'BLK',
        style: '63 867',
        paint: '900A',
        dateCode: 'I3',
      };

      const result = trimTagDecoder(tagData, '1963');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('Black Vinyl');
      expect(result['style'].description).toBe(BodyStyles.CONVERTIBLE);
      expect(result['paint'].description).toBe('Tuxedo Black');
      expect(result['dateCode'].description).toBe('May, 3rd Week');
    });
  });

  describe('Trim Tag Decoder for 1964', () => {
    it('Decodes tag data for a 1964 car: 1', () => {
      const tagData = {
        body: '438',
        trim: '490CA',
        style: '64 837',
        paint: '932AA',
        dateCode: 'A20',
      };

      const result = trimTagDecoder(tagData, '1964');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('Saddle Vinyl');
      expect(result['style'].description).toBe(BodyStyles.COUPE);
      expect(result['paint'].description).toBe('Saddle Tan');
      expect(result['dateCode'].description).toBe('September 20');
    });

    it('Decodes tag data for a 1964 car: 2', () => {
      const tagData = {
        body: 'S10325',
        trim: '490BB',
        style: '64 867',
        paint: '916AA',
        dateCode: 'J17',
      };

      const result = trimTagDecoder(tagData, '1964');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('Blue Vinyl');
      expect(result['style'].description).toBe(BodyStyles.CONVERTIBLE);
      expect(result['paint'].description).toBe('Daytona Blue');
      expect(result['dateCode'].description).toBe('June 17');
    });

    it('Decodes tag data for a 1964 car: 3', () => {
      const tagData = {
        body: 'A-1097',
        trim: '490H',
        style: '867',
        paint: '940A',
        dateCode: 'D27',
      };

      const result = trimTagDecoder(tagData, '1964');

      expect(result['body'].description).toBe(Plants.AOSMITH);
      expect(result['trim'].description).toBe('Red Vinyl');
      expect(result['style'].description).toBe(BodyStyles.CONVERTIBLE);
      expect(result['paint'].description).toBe('Satin Silver');
      expect(result['dateCode'].description).toBe('April 27');
    });

    it('Decodes tag data for a 1964 car: 4', () => {
      const tagData = {
        body: 'A-007',
        trim: '491C',
        style: '837',
        paint: '940A',
        dateCode: 'A28',
      };

      const result = trimTagDecoder(tagData, '1964');

      expect(result['body'].description).toBe(Plants.AOSMITH);
      expect(result['trim'].description).toBe('White Vinyl, Black Dash');
      expect(result['style'].description).toBe(BodyStyles.COUPE);
      expect(result['paint'].description).toBe('Satin Silver');
      expect(result['dateCode'].description).toBe('January 28');
    });
  });

  describe('Trim Tag Decoder for 1965', () => {
    it('Decodes tag data for a 1965 car: 1', () => {
      const tagData = {
        body: 'S3100',
        trim: '437BA',
        style: '65 467',
        paint: '900MM',
        dateCode: 'G11',
      };

      const result = trimTagDecoder(tagData, '1965');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('White/Black Vinyl');
      expect(result['style'].description).toBe(BodyStyles.CONVERTIBLE);
      expect(result['paint'].description).toBe('Milano Maroon');
      expect(result['dateCode'].description).toBe('February 11');
    });

    it('Decodes tag data for a 1965 car: 2', () => {
      const tagData = {
        body: 'S3435',
        trim: '420HA',
        style: '65 437',
        paint: '900GG',
        dateCode: 'K4',
      };

      const result = trimTagDecoder(tagData, '1965');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('Saddle Vinyl');
      expect(result['style'].description).toBe(BodyStyles.COUPE);
      expect(result['paint'].description).toBe('Glen Green');
      expect(result['dateCode'].description).toBe('June 4');
    });

    it('Decodes tag data for a 1965 car: 3', () => {
      const tagData = {
        body: 'A-3611',
        trim: '450B',
        style: '19 467',
        paint: 'F-F',
        dateCode: 'G22',
      };

      const result = trimTagDecoder(tagData, '1965');

      expect(result['body'].description).toBe(Plants.AOSMITH);
      expect(result['trim'].description).toBe('White/Blue Vinyl');
      expect(result['style'].description).toBe(BodyStyles.CONVERTIBLE);
      expect(result['paint'].description).toBe('Nassau Blue');
      expect(result['dateCode'].description).toBe('February 22');
    });

    it('Decodes tag data for a 1965 car: 4', () => {
      const tagData = {
        body: 'A-831',
        trim: 'STD',
        style: '19 437',
        paint: 'F-F',
        dateCode: 'E  3',
      };

      const result = trimTagDecoder(tagData, '1965');

      expect(result['body'].description).toBe(Plants.AOSMITH);
      expect(result['trim'].description).toBe('Black Vinyl');
      expect(result['style'].description).toBe(BodyStyles.COUPE);
      expect(result['paint'].description).toBe('Nassau Blue');
      expect(result['dateCode'].description).toBe('December 3');
    });
  });

  describe('Trim Tag Decoder for 1966', () => {
    it('Decodes tag data for a 1966 car: 1', () => {
      const tagData = {
        body: 'S923',
        trim: '450BK',
        style: '66 467',
        paint: '972AA',
        dateCode: 'B11',
      };

      const result = trimTagDecoder(tagData, '1966');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('White/Blue Vinyl');
      expect(result['style'].description).toBe(BodyStyles.CONVERTIBLE);
      expect(result['paint'].description).toBe('Ermine White');
      expect(result['dateCode'].description).toBe('October 11');
    });

    it('Decodes tag data for a 1966 car: 2', () => {
      const tagData = {
        body: 'S4895',
        trim: 'STD.',
        style: '66 437',
        paint: '900AA',
        dateCode: 'K25',
      };

      const result = trimTagDecoder(tagData, '1966');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('Black Vinyl');
      expect(result['style'].description).toBe(BodyStyles.COUPE);
      expect(result['paint'].description).toBe('Tuxedo Black');
      expect(result['dateCode'].description).toBe('July 25');
    });

    it('Decodes tag data for a 1966 car: 3', () => {
      const tagData = {
        body: 'A-7681',
        trim: '418',
        style: '66 467',
        paint: '980',
        dateCode: 'K06',
      };

      const result = trimTagDecoder(tagData, '1966');

      expect(result['body'].description).toBe(Plants.AOSMITH);
      expect(result['trim'].description).toBe('Dark Blue Vinyl');
      expect(result['style'].description).toBe(BodyStyles.CONVERTIBLE);
      expect(result['paint'].description).toBe('Trophy Blue');
      expect(result['dateCode'].description).toBe('June 6');
    });

    it('Decodes tag data for a 1966 car: 4', () => {
      const tagData = {
        body: 'A-2128',
        trim: '414',
        style: '66 437',
        paint: '978',
        dateCode: 'F06',
      };

      const result = trimTagDecoder(tagData, '1966');

      expect(result['body'].description).toBe(Plants.AOSMITH);
      expect(result['trim'].description).toBe('Bright Blue Vinyl');
      expect(result['style'].description).toBe(BodyStyles.COUPE);
      expect(result['paint'].description).toBe('Laguna Blue');
      expect(result['dateCode'].description).toBe('January 6');
    });
  });

  describe('Trim Tag Decoder for 1967', () => {
    it('Decodes tag data for a 1967 car: 1', () => {
      const tagData = {
        body: 'S8946',
        trim: 'STD',
        style: '67 467',
        paint: '988AA',
        dateCode: 'K20',
      };

      const result = trimTagDecoder(tagData, '1967');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('Black Vinyl');
      expect(result['style'].description).toBe(BodyStyles.CONVERTIBLE);
      expect(result['paint'].description).toBe('Marlboro Maroon');
      expect(result['dateCode'].description).toBe('June 20');
    });

    it('Decodes tag data for a 1967 car: 2', () => {
      const tagData = {
        body: 'S3189',
        trim: 'STD.',
        style: '67 437',
        paint: '988AA',
        dateCode: 'G01',
      };

      const result = trimTagDecoder(tagData, '1967');

      expect(result['body'].description).toBe(Plants.STLOUIS);
      expect(result['trim'].description).toBe('Black Vinyl');
      expect(result['style'].description).toBe(BodyStyles.COUPE);
      expect(result['paint'].description).toBe('Marlboro Maroon');
      expect(result['dateCode'].description).toBe('February 1');
    });

    it('Decodes tag data for a 1967 car: 3', () => {
      const tagData = {
        body: 'A-095',
        trim: 'STD.',
        style: '67 467',
        paint: '984',
        dateCode: 'F26',
      };

      const result = trimTagDecoder(tagData, '1967');

      expect(result['body'].description).toBe(Plants.AOSMITH);
      expect(result['trim'].description).toBe('Black Vinyl');
      expect(result['style'].description).toBe(BodyStyles.CONVERTIBLE);
      expect(result['paint'].description).toBe('Sunfire Yellow');
      expect(result['dateCode'].description).toBe('January 26');
    });

    it('Decodes tag data for a 1967 car: 4', () => {
      const tagData = {
        body: 'A-008',
        trim: '407',
        style: '67 437',
        paint: '974',
        dateCode: 'A24',
      };

      const result = trimTagDecoder(tagData, '1967');

      expect(result['body'].description).toBe(Plants.AOSMITH);
      expect(result['trim'].description).toBe('Red Vinyl');
      expect(result['style'].description).toBe(BodyStyles.COUPE);
      expect(result['paint'].description).toBe('Rally Red');
      expect(result['dateCode'].description).toBe('August 24');
    });
  });
});
