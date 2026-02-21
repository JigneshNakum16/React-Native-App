import { Validators, ValidationMessages } from '../validation';

describe('Validators', () => {
  describe('email validation', () => {
    it('should validate correct email addresses', () => {
      expect(Validators.email('test@example.com')).toBe(true);
      expect(Validators.email('user.name@example.com')).toBe(true);
      expect(Validators.email('user+tag@example.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(Validators.email('invalid')).toBe(false);
      expect(Validators.email('invalid@')).toBe(false);
      expect(Validators.email('@example.com')).toBe(false);
      expect(Validators.email('invalid@.com')).toBe(false);
    });
  });

  describe('phone validation', () => {
    it('should validate correct Indian phone numbers', () => {
      expect(Validators.phone('9876543210')).toBe(true);
      expect(Validators.phone('7890123456')).toBe(true);
      expect(Validators.phone('6123456789')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(Validators.phone('1234567890')).toBe(false); // Starts with 1
      expect(Validators.phone('987654321')).toBe(false); // 9 digits
      expect(Validators.phone('98765432101')).toBe(false); // 11 digits
      expect(Validators.phone('abcdefghij')).toBe(false); // Non-numeric
    });
  });

  describe('pincode validation', () => {
    it('should validate correct Indian PIN codes', () => {
      expect(Validators.pincode('110001')).toBe(true);
      expect(Validators.pincode('560034')).toBe(true);
      expect(Validators.pincode('400001')).toBe(true);
    });

    it('should reject invalid PIN codes', () => {
      expect(Validators.pincode('000000')).toBe(false); // Starts with 0
      expect(Validators.pincode('11000')).toBe(false); // 5 digits
      expect(Validators.pincode('1100001')).toBe(false); // 7 digits
    });
  });

  describe('length validation', () => {
    it('should validate string length within range', () => {
      expect(Validators.length('test', 3, 5)).toBe(true);
      expect(Validators.length('test', 4, 4)).toBe(true);
    });

    it('should reject strings outside range', () => {
      expect(Validators.length('test', 5, 10)).toBe(false); // Too short
      expect(Validators.length('testing', 1, 3)).toBe(false); // Too long
    });
  });

  describe('sanitizeString', () => {
    it('should sanitize XSS attempts', () => {
      expect(Validators.sanitizeString('<script>alert("xss")</script>'))
        .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
      expect(Validators.sanitizeString('<img src="x" onerror="alert(1)">'))
        .toBe('&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;');
    });

    it('should trim whitespace', () => {
      expect(Validators.sanitizeString('  test  ')).toBe('test');
    });
  });

  describe('quantity validation', () => {
    it('should validate quantities within range', () => {
      expect(Validators.quantity(1)).toBe(true);
      expect(Validators.quantity(50)).toBe(true);
      expect(Validators.quantity(99)).toBe(true);
    });

    it('should reject invalid quantities', () => {
      expect(Validators.quantity(0)).toBe(false);
      expect(Validators.quantity(100)).toBe(false);
      expect(Validators.quantity(-1)).toBe(false);
      expect(Validators.quantity(1.5)).toBe(false);
    });
  });

  describe('price validation', () => {
    it('should validate positive prices', () => {
      expect(Validators.price(1)).toBe(true);
      expect(Validators.price(99.99)).toBe(true);
      expect(Validators.price(1000000)).toBe(true);
    });

    it('should reject invalid prices', () => {
      expect(Validators.price(0)).toBe(false);
      expect(Validators.price(-1)).toBe(false);
      expect(Validators.price(NaN)).toBe(false);
      expect(Validators.price(Infinity)).toBe(false);
    });
  });

  describe('url validation', () => {
    it('should validate correct URLs', () => {
      expect(Validators.url('http://example.com')).toBe(true);
      expect(Validators.url('https://example.com')).toBe(true);
      expect(Validators.url('https://example.com/path')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(Validators.url('not-a-url')).toBe(false);
      expect(Validators.url('ftp://example.com')).toBe(false); // Non-http protocol
    });
  });
});

describe('ValidationMessages', () => {
  it('should have correct email message', () => {
    expect(ValidationMessages.email).toBe('Please enter a valid email address');
  });

  it('should have correct phone message', () => {
    expect(ValidationMessages.phone).toBe('Please enter a valid 10-digit phone number');
  });

  it('should have dynamic length messages', () => {
    expect(ValidationMessages.minLength(5)).toBe('Minimum 5 characters required');
    expect(ValidationMessages.maxLength(100)).toBe('Maximum 100 characters allowed');
  });
});
