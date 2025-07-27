import { validateArrayLength, validateNumberRange, validateObjectAttributes, validateStringLength, validateRegExp } from '../src';

describe('validation', () => {
  describe('validateArrayLength', () => {
    it('should validate correct array length', () => {
      const errors = validateArrayLength({
        value: [1, 2, 3],
        min: 2,
        max: 3,
      });
      expect(errors).toEqual([]);
    });

    it('should validate incorrect array length', () => {
      const errors = validateArrayLength({ value: [1, 2, 3], min: 4, max: undefined, messagePrefix: 'test: ' });
      expect(errors).toEqual(['test: must have at least 4 elements']);
    });

    it('should fail if min is greater than max', () => {
      expect(() => {
        validateArrayLength({ value: [1, 2, 3], min: 4, max: 3 });
      }).toThrow('min must be less than max');
    });

    it('should return [] if min === undefined && max === undefined', () => {
      const errors = validateArrayLength({ value: [1, 2, 3], min: undefined, max: undefined });
      expect(errors).toEqual([]);
    });

    it('should validate incorrect array length', () => {
      const errors = validateArrayLength({ value: [1, 2, 3], min: undefined, max: 2 });
      expect(errors).toEqual(['must have at most 2 elements']);
    });
  });

  describe('validateNumberRange', () => {
    it('should validate correct number range', () => {
      const errors = validateNumberRange({ value: 2, min: 1, max: 3 });
      expect(errors).toEqual([]);
    });

    it('should fail if max is undefined and values is smaller than min', () => {
      const errors = validateNumberRange({ value: 2, min: 4, max: undefined });
      expect(errors).toEqual(['must be at least 4']);
    });

    it('should fail if min is greater than max', () => {
      expect(() => {
        validateNumberRange({ value: 2, min: 4, max: 3 });
      }).toThrow('min must be less than max');
    });

    it('should return [] if min === undefined && max === undefined', () => {
      const errors = validateNumberRange({ value: 2, min: undefined, max: undefined });
      expect(errors).toEqual([]);
    });

    it('should fail if min is undefined and max is less than value', () => {
      const errors = validateNumberRange({ value: 2, min: undefined, max: 1 });
      expect(errors).toEqual(['must be at most 1']);
    });
  });

  describe('validateObjectAttributes', () => {
    it('should validate correct object attributes', () => {
      const errors = validateObjectAttributes({ inputObject: { a: 1, b: 2 }, mandatoryAttributes: ['a'], optionalAttributes: ['b'] });
      expect(errors).toEqual([]);
    });

    it('should validate incorrect object attributes', () => {
      const errors = validateObjectAttributes({ inputObject: { a: 1 }, mandatoryAttributes: ['a', 'b'], optionalAttributes: [] });
      expect(errors).toEqual(['missing mandatory attribute: b']);
    });

    it('should validate unknown object attributes', () => {
      const errors = validateObjectAttributes({ inputObject: { a: 1, b: 2, c: 3 }, mandatoryAttributes: ['a', 'b'], optionalAttributes: [] });
      expect(errors).toEqual(['contains unknown attribute: c']);
    });
  });

  describe('validateStringLength', () => {
    it('should validate correct string length', () => {
      const errors = validateStringLength({ value: 'abc', min: 2, max: 3 });
      expect(errors).toEqual([]);
    });

    it('should validate incorrect string length', () => {
      const errors = validateStringLength({ value: 'abc', min: 4, max: undefined });
      expect(errors).toEqual(['must be at least 4 characters long']);
    });

    it('should fail if min is greater than max', () => {
      expect(() => {
        validateStringLength({ value: 'abc', min: 4, max: 3 });
      }).toThrow('min must be less than max');
    });

    it('should return [] if min === undefined && max === undefined', () => {
      const errors = validateStringLength({ value: 'abc', min: undefined, max: undefined });
      expect(errors).toEqual([]);
    });

    it('should fail if min is undefined and max is less than value', () => {
      const errors = validateStringLength({ value: 'abc', min: undefined, max: 2 });
      expect(errors).toEqual(['must be at most 2 characters long']);
    });
  });

  describe('validateRegExp', () => {
    it('should validate correct string regExp', () => {
      const errors = validateRegExp({ value: 'abc', regExp: /^[a-z]+$/ });
      expect(errors).toEqual([]);
    });

    it('should validate incorrect string regExp', () => {
      const errors = validateRegExp({ value: 'abc', regExp: /^[0-9]+$/ });
      expect(errors).toEqual(['must match regExp /^[0-9]+$/']);
    });

    it('should include custom message if specified', () => {
      const errors = validateRegExp({ value: 'abc', regExp: /^[0-9]+$/, message: 'must be a number' });
      expect(errors).toEqual(['must be a number']);
    });
  });
});