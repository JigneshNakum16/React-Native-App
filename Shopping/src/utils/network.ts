/**
 * Network utilities for API calls and offline handling
 */

import NetInfo from '@react-native-community/netinfo';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string;
}

/**
 * Check current network connectivity
 */
export const checkConnectivity = async (): Promise<NetworkState> => {
  const state = await NetInfo.fetch();
  return {
    isConnected: state.isConnected ?? false,
    isInternetReachable: state.isInternetReachable,
    type: state.type,
  };
};

/**
 * Subscribe to network state changes
 */
export const subscribeToNetworkChanges = (
  callback: (state: NetworkState) => void
): (() => void) => {
  const unsubscribe = NetInfo.addEventListener((_state) => {
    callback({
      isConnected: _state.isConnected ?? false,
      isInternetReachable: _state.isInternetReachable,
      type: _state.type,
    });
  });
  return unsubscribe;
};

/**
 * Safe fetch wrapper with offline check
 */
export const safeFetch = async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  const networkState = await checkConnectivity();

  if (!networkState.isConnected) {
    throw new Error('No internet connection. Please check your network.');
  }

  if (!networkState.isInternetReachable) {
    throw new Error('Internet is not reachable. Please try again later.');
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

/**
 * Retry wrapper for failed requests
 */
export const fetchWithRetry = async (
  url: string,
  options?: RequestInit,
  maxRetries = 3,
  delayMs = 1000
): Promise<Response> => {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await safeFetch(url, options);
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        // Exponential backoff
        await new Promise<void>(resolve =>
          setTimeout(resolve, delayMs * Math.pow(2, attempt - 1))
        );
      }
    }
  }

  throw lastError || new Error('Failed to fetch after retries');
};
