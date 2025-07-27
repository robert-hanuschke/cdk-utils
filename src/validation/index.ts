/**
 * Validates that the length of an array falls within optional minimum and/or maximum bounds.
 *
 * @param value - The array to validate.
 * @param min - (Optional) Minimum allowed length of the array.
 * @param max - (Optional) Maximum allowed length of the array.
 * @param message - (Optional) Custom error message to use if the validation fails.
 * @param messagePrefix - (Optional) String to prepend to the error message(s).
 * @returns An array of error messages. Returns an empty array if the length is valid or no bounds are specified.
 *
 * @throws Error if both `min` and `max` are provided and `min` is greater than `max`.
 */
export function validateArrayLength({
  value,
  min,
  max,
  message,
  messagePrefix,
}: {
  value: unknown[];
  min?: number;
  max?: number;
  message?: string;
  messagePrefix?: string;
}): string[] {
  if (min === undefined && max === undefined) {
    return [];
  }
  if (min !== undefined && max !== undefined && min > max) {
    throw new Error('min must be less than max');
  }

  const errors: string[] = [];
  if (min !== undefined && value.length < min) {
    errors.push(
      (messagePrefix || '') + (message || `must have at least ${min} element${min === 1 ? '' : 's'}`),
    );
  }
  if (max !== undefined && value.length > max) {
    errors.push(
      (messagePrefix || '') + (message || `must have at most ${max} element${max === 1 ? '' : 's'}`),
    );
  }
  return errors;
}

/**
 * Validates that a number falls within optional minimum and/or maximum bounds.
 *
 * @param value - The number to validate.
 * @param min - (Optional) Minimum allowed value of the number.
 * @param max - (Optional) Maximum allowed value of the number.
 * @param message - (Optional) Custom error message to use if the validation fails.
 * @param messagePrefix - (Optional) String to prepend to the error message(s).
 * @returns An array of error messages. Returns an empty array if the number is valid or no bounds are specified.
 *
 * @throws Error if both `min` and `max` are provided and `min` is greater than `max`.
 *
 */
export function validateNumberRange({
  value,
  min,
  max,
  message,
  messagePrefix,
}: {
  value: number;
  min?: number;
  max?: number;
  message?: string;
  messagePrefix?: string;
}): string[] {
  if (min === undefined && max === undefined) {
    return [];
  }
  if (min !== undefined && max !== undefined && min > max) {
    throw new Error('min must be less than max');
  }

  const errors: string[] = [];
  if (min !== undefined && value < min) {
    errors.push((messagePrefix || '') + (message || `must be at least ${min}`));
  }
  if (max !== undefined && value > max) {
    errors.push((messagePrefix || '') + (message || `must be at most ${max}`));
  }
  return errors;
}

/**
 * Validates that an object contains only the specified mandatory and optional attributes.
 *
 * @param inputObject - The object to validate.
 * @param mandatoryAttributes - An array of mandatory attribute names.
 * @param optionalAttributes - An array of optional attribute names.
 * @param message - (Optional) Custom error message to use if the validation fails.
 * @param messagePrefix - (Optional) String to prepend to the error message(s).
 * @returns An array of error messages. Returns an empty array if the object is valid.
 */
export function validateObjectAttributes({
  inputObject,
  mandatoryAttributes,
  optionalAttributes,
  message,
  messagePrefix,
}: {
  inputObject: object;
  mandatoryAttributes: string[];
  optionalAttributes: string[];
  message?: string;
  messagePrefix?: string;
}): string[] {
  const errors: string[] = [];
  const keys = Object.keys(inputObject);
  const allAttributes = mandatoryAttributes.concat(optionalAttributes);
  for (const mandatoryAttribute of mandatoryAttributes) {
    if (!keys.includes(mandatoryAttribute)) {
      errors.push(
        messagePrefix ||
        '' + (message || `missing mandatory attribute: ${mandatoryAttribute}`),
      );
    }
  }
  for (const key of keys) {
    if (!allAttributes.includes(key)) {
      errors.push(
        (messagePrefix || '') + (message || `contains unknown attribute: ${key}`),
      );
    }
  }
  return errors;
}

/**
 * Validates that a string falls within optional minimum and/or maximum length bounds.
 *
 * @param value - The string to validate.
 * @param min - (Optional) Minimum allowed length of the string.
 * @param max - (Optional) Maximum allowed length of the string.
 * @param message - (Optional) Custom error message to use if the validation fails.
 * @param messagePrefix - (Optional) String to prepend to the error message(s).
 * @returns An array of error messages. Returns an empty array if the length is valid or no bounds are specified.
 *
 * @throws Error if both `min` and `max` are provided and `min` is greater than `max`.
 */
export function validateStringLength({
  value,
  min,
  max,
  message,
  messagePrefix,
}: {
  value: string;
  min?: number;
  max?: number;
  message?: string;
  messagePrefix?: string;
}): string[] {
  if (min === undefined && max === undefined) {
    return [];
  }
  if (min !== undefined && max !== undefined && min > max) {
    throw new Error('min must be less than max');
  }

  const errors: string[] = [];
  if (min !== undefined && value.length < min) {
    errors.push(
      (messagePrefix ||
        '') + (message || `must be at least ${min} character${min === 1 ? '' : 's'} long`),
    );
  }
  if (max !== undefined && value.length > max) {
    errors.push(
      (messagePrefix ||
        '') + (message || `must be at most ${max} character${max === 1 ? '' : 's'} long`),
    );
  }
  return errors;
}

/**
 * Validates that a string matches a regular expression.
 *
 * @param value - The string to validate.
 * @param regExp - The regular expression to match.
 * @param message - (Optional) Custom error message to use if the validation fails.
 * @param messagePrefix - (Optional) String to prepend to the error message(s).
 * @returns An array of error messages. Returns an empty array if the string matches the regular expression.
 */
export function validateRegExp({
  value,
  regExp,
  message,
  messagePrefix,
}: {
  value: string;
  regExp: RegExp;
  message?: string;
  messagePrefix?: string;
}): string[] {
  const errors: string[] = [];
  if (!regExp.test(value)) {
    errors.push(
      (messagePrefix || '') + (message || `must match regExp ${regExp}`),
    );
  }
  return errors;
}
