/**
 * Input validation utilities
 * Provides validation functions for user inputs to prevent security issues
 */

export const Validators = {
  /**
   * Validates email address format
   */
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validates phone number (Indian format)
   */
  phone: (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  /**
   * Validates PIN code (Indian format - 6 digits)
   */
  pincode: (pincode: string): boolean => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  },

  /**
   * Validates string length
   */
  length: (value: string, min: number, max: number): boolean => {
    return value.length >= min && value.length <= max;
  },

  /**
   * Sanitizes user input to prevent XSS
   */
  sanitizeString: (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .trim();
  },

  /**
   * Validates quantity is within acceptable range
   */
  quantity: (qty: number): boolean => {
    return Number.isInteger(qty) && qty >= 1 && qty <= 99;
  },

  /**
   * Validates price is positive
   */
  price: (price: number): boolean => {
    return Number.isFinite(price) && price > 0;
  },

  /**
   * Validates URL format
   */
  url: (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  },
};

/**
 * Error messages for validation failures
 */
export const ValidationMessages = {
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid 10-digit phone number',
  pincode: 'Please enter a valid 6-digit PIN code',
  required: 'This field is required',
  minLength: (min: number) => `Minimum ${min} characters required`,
  maxLength: (max: number) => `Maximum ${max} characters allowed`,
  quantity: 'Quantity must be between 1 and 99',
};
