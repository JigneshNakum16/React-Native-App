/**
 * Production-ready logging utility
 * Logs to console in development, can be extended for remote logging in production
 */

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  error?: Error;
}

class Logger {
  private isDev = __DEV__;

  private formatLog(entry: LogEntry): string {
    return `[${entry.timestamp}] [${entry.level}] ${entry.message}`;
  }

  private log(level: LogLevel, message: string, data?: unknown, error?: Error): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      error,
    };

    if (this.isDev) {
      const formattedMessage = this.formatLog(entry);

      switch (level) {
        case LogLevel.DEBUG:
          console.log(formattedMessage, data || '');
          break;
        case LogLevel.INFO:
          console.info(formattedMessage, data || '');
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage, data || '');
          break;
        case LogLevel.ERROR:
          console.error(formattedMessage, error || data || '');
          break;
      }
    }

    // TODO: Send to remote logging service (Sentry, Crashlytics, etc.)
    // this.sendToRemoteLogging(entry);
  }

  debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: Error, data?: unknown): void {
    this.log(LogLevel.ERROR, message, data, error);
  }

  /**
   * Log user actions for analytics
   */
  trackEvent(eventName: string, properties?: Record<string, unknown>): void {
    this.info(`Event: ${eventName}`, properties);
    // TODO: Send to analytics service
  }

  /**
   * Log screen views for analytics
   */
  trackScreen(screenName: string, properties?: Record<string, unknown>): void {
    this.info(`Screen: ${screenName}`, properties);
    // TODO: Send to analytics service
  }
}

// Export singleton instance
export const logger = new Logger();
