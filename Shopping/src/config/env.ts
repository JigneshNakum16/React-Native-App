/**
 * Environment configuration
 * Provides type-safe access to environment variables
 */

import { API_BASE_URL, API_TIMEOUT, API_RETRY_ATTEMPTS, ENABLE_ANALYTICS, ENABLE_CRASH_REPORTING, ENABLE_DEBUG_MODE, APP_NAME, APP_VERSION, ENV } from '@env';

export const config = {
  // API Configuration
  api: {
    baseURL: API_BASE_URL || 'https://api.shophub.com',
    timeout: parseInt(API_TIMEOUT || '10000', 10),
    retryAttempts: parseInt(API_RETRY_ATTEMPTS || '3', 10),
  },

  // Feature Flags
  features: {
    analytics: ENABLE_ANALYTICS === 'true',
    crashReporting: ENABLE_CRASH_REPORTING === 'true',
    debugMode: ENABLE_DEBUG_MODE === 'true',
  },

  // App Configuration
  app: {
    name: APP_NAME || 'ShopHub',
    version: APP_VERSION || '1.0.0',
    environment: ENV || 'development',
  },

  // Helper to check if in development
  isDevelopment: ENV !== 'production',

  // Helper to check if in production
  isProduction: ENV === 'production',
} as const;

export type Config = typeof config;
