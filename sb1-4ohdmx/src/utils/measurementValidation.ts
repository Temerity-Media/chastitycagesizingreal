export const clampValue = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const validateMeasurement = (value: string): {
  isValid: boolean;
  value: string;
  message?: string;
} => {
  // Allow empty string or backspacing
  if (value === '' || value === '-' || value === '.') {
    return { isValid: true, value };
  }

  // Check if it's a valid number
  const num = parseFloat(value);
  if (isNaN(num)) {
    return { 
      isValid: false, 
      value,
      message: 'Please enter a valid number' 
    };
  }

  return {
    isValid: true,
    value
  };
};