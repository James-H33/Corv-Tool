import { validateVin } from '../validate-vin.function';

describe('validateVin', () => {
  it('should return isValid true for a valid VIN', () => {
    const vin = '194377S114105';
    const year = '1967';
    const result = validateVin(vin, year);
    expect(result.isValid).toBe(true);
  });

  it('should return isValid false for an invalid VIN', () => {
    const vin = 'INVALIDVIN';
    const year = '1967';
    const result = validateVin(vin, year);
    expect(result.isValid).toBe(false);
  });

  describe('1963 and 1964 VINs', () => {
    describe('1963 VINs', () => {
      it('should return isValid true for a valid 1963 VIN', () => {
        const vin = '30837S100001';
        const year = '1963';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(true);
      });

      it('should return isValid false if the VIN is too short', () => {
        const vin = '30837S10000'; // 11 characters
        const year = '1963';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('VIN is too short');
      });

      it('should return isValid false if the model year is invalid', () => {
        const vin = '50837S100001';
        const year = '1963';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Model Year must be 3 or 4 for 1963 and 1964');
      });

      it('should return isValid false if the series is invalid', () => {
        const vin = '31137S100001';
        const year = '1963';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Series must be 2 digits "08"');
      });

      it('should return isValid false if the body style is invalid', () => {
        const vin = '30847S100001';
        const year = '1963';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Body Style must be 2 digits "37" or "67"');
      });

      it('should return isValid false if the assembly plant is invalid', () => {
        const vin = '30837X100001';
        const year = '1963';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Assembly Plant must be 1 letter : "S"');
      });

      it('should return isValid false if the production sequence is invalid', () => {
        const vin = '30837S10000A';
        const year = '1963';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Production Sequence must be 6 digits for 1963 and 1964');
      });
    });

    describe('1964 VINs', () => {
      it('should return isValid true for a valid 1964 VIN', () => {
        const vin = '40837S100001';
        const year = '1964';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(true);
      });

      it('should return isValid false if the VIN is too short', () => {
        const vin = '40837S10000'; // 11 characters
        const year = '1964';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('VIN is too short');
      });

      it('should return isValid false if the model year is invalid', () => {
        const vin = '50837S100001';
        const year = '1964';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Model Year must be 3 or 4 for 1963 and 1964');
      });

      it('should return isValid false if the series is invalid', () => {
        const vin = '41137S100001';
        const year = '1964';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Series must be 2 digits "08"');
      });

      it('should return isValid false if the body style is invalid', () => {
        const vin = '40847S100001';
        const year = '1964';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Body Style must be 2 digits "37" or "67"');
      });

      it('should return isValid false if the assembly plant is invalid', () => {
        const vin = '40837X100001';
        const year = '1964';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Assembly Plant must be 1 letter : "S"');
      });

      it('should return isValid false if the production sequence is invalid', () => {
        const vin = '40837S10000A';
        const year = '1964';
        const result = validateVin(vin, year);
        expect(result.isValid).toBe(false);
        expect(result.invalidReason).toBe('Production Sequence must be 6 digits for 1963 and 1964');
      });
    });
  });

  describe('1965 and later VINs', () => {
    it('should return isValid true for a valid 1965 VIN', () => {
      const vin = '194375S100001';
      const year = '1965';
      const result = validateVin(vin, year);
      expect(result.isValid).toBe(true);
    });

    it('should return isValid false if the VIN is too short', () => {
      const vin = '194375S1000'; // 11 characters
      const year = '1965';
      const result = validateVin(vin, year);
      expect(result.isValid).toBe(false);
      expect(result.invalidReason).toBe('VIN is too short');
    });

    it('should return isValid false if the make is invalid', () => {
      const vin = '294375S100001';
      const year = '1965';
      const result = validateVin(vin, year);
      expect(result.isValid).toBe(false);
      expect(result.invalidReason).toBe('Make must be 1 for 1965 and later');
    });

    it('should return isValid false if the series is invalid', () => {
      const vin = '192385S100001';
      const year = '1965';
      const result = validateVin(vin, year);
      expect(result.isValid).toBe(false);
      expect(result.invalidReason).toBe('Series must be 2 digits for 1965 and later : "94"');
    });

    it('should return isValid false if the body style is invalid', () => {
      const vin = '1942326S100001';
      const year = '1965';
      const result = validateVin(vin, year);
      expect(result.isValid).toBe(false);
      expect(result.invalidReason).toBe('Body Style must be 2 digits "37" or "67"');
    });

    it('should return isValid false if the assembly plant is invalid', () => {
      const vin = '194375X100001';
      const year = '1965';
      const result = validateVin(vin, year);
      expect(result.isValid).toBe(false);
      expect(result.invalidReason).toBe('Assembly Plant must be 1 letter : "S"');
    });

    it('should return isValid false if the production sequence is invalid', () => {
      const vin = '194375S10000A';
      const year = '1965';
      const result = validateVin(vin, year);
      expect(result.isValid).toBe(false);
      expect(result.invalidReason).toBe('Production Sequence must be 6 digits for 1965 and later');
    });
  });
});
