export interface ValidatableString {
  type: 'string';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface ValidatableNumber {
  type: 'number';
  required?: boolean;
  min?: number;
  max?: number;
}

export function validate(
  value: string,
  config: ValidatableString | ValidatableNumber
) {
  let isValid = true;
  if (config.required) {
    isValid = isValid && validateRequired(value);
  }
  if (config.type === 'number') {
    return isValid && validateNumber(+value, config as ValidatableNumber);
  } else {
    return isValid && validateString(value, config as ValidatableString);
  }
}

function validateNumber(value: number, config: ValidatableNumber): boolean {
  let isValid = true;
  if (config.min) {
    isValid = isValid && value >= config.min;
  }
  if (config.max) {
    isValid = isValid && value <= config.max;
  }
  return isValid;
}

function validateString(value: string, config: ValidatableString): boolean {
  let isValid = true;
  if (config.minLength) {
    isValid = isValid && value.length >= config.minLength;
  }
  if (config.maxLength) {
    isValid = isValid && value.length <= config.maxLength;
  }
  return isValid;
}

function validateRequired(value: string | number): boolean {
  return value.toString().trim().length !== 0;
}
