/**
 * API service structure for backend integration
 * Provides a foundation for connecting to a real backend API
 */

import { logger } from '../utils/logger';
import { safeFetch, fetchWithRetry } from '../utils/network';

// API Configuration
const API_CONFIG = {
  baseURL: __DEV__
    ? 'https://api-dev.shophub.com' // Dev API
    : 'https://api.shophub.com',    // Production API
  timeout: 10000,
  retryAttempts: 3,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  PRODUCT_SEARCH: '/products/search',

  // Cart
  CART: '/cart',
  CART_ADD: '/cart/items',
  CART_UPDATE: (id: string) => `/cart/items/${id}`,
  CART_REMOVE: (id: string) => `/cart/items/${id}`,
  CART_CLEAR: '/cart/clear',

  // Wishlist
  WISHLIST: '/wishlist',
  WISHLIST_ADD: '/wishlist/items',
  WISHLIST_REMOVE: (id: string) => `/wishlist/items/${id}`,

  // Orders
  ORDERS: '/orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  ORDER_CREATE: '/orders',

  // User
  USER_PROFILE: '/user/profile',
  USER_ADDRESSES: '/user/addresses',
  USER_PAYMENTS: '/user/payment-methods',
} as const;

// Generic API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Request types
export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

/**
 * Build full URL for API endpoint
 */
const buildUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

/**
 * Make API request with error handling and retry logic
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    timeout = API_CONFIG.timeout,
    retries = API_CONFIG.retryAttempts,
    ...fetchOptions
  } = options;

  const url = buildUrl(endpoint);

  // Default headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Add auth token if available (TODO: implement auth)
  // const token = await getAuthToken();
  // if (token) {
  //   headers['Authorization'] = `Bearer ${token}`;
  // }

  try {
    logger.debug(`API Request: ${fetchOptions.method || 'GET'} ${url}`);

    const response = await fetchWithRetry(
      url,
      {
        ...fetchOptions,
        headers,
      },
      retries
    );

    const data = await response.json();

    logger.debug(`API Response: ${url}`, data);

    return data as T;
  } catch (error) {
    logger.error(`API Error: ${url}`, error as Error);

    if (error instanceof Error) {
      throw new ApiError(
        error.message,
        0, // Network errors don't have status codes
        { url, method: fetchOptions.method }
      );
    }

    throw error;
  }
}

/**
 * API Service Object
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};

/**
 * Product API methods
 */
export const productApi = {
  getAll: () => api.get<Product[]>(API_ENDPOINTS.PRODUCTS),
  getById: (id: string) => api.get<Product>(API_ENDPOINTS.PRODUCT_DETAIL(id)),
  search: (query: string) =>
    api.get<Product[]>(`${API_ENDPOINTS.PRODUCT_SEARCH}?q=${encodeURIComponent(query)}`),
  getByCategory: (category: string) =>
    api.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}?category=${encodeURIComponent(category)}`),
};

/**
 * Cart API methods
 */
export const cartApi = {
  get: () => api.get<CartItem[]>(API_ENDPOINTS.CART),
  add: (productId: string, quantity: number) =>
    api.post(API_ENDPOINTS.CART_ADD, { productId, quantity }),
  update: (itemId: string, quantity: number) =>
    api.put(API_ENDPOINTS.CART_UPDATE(itemId), { quantity }),
  remove: (itemId: string) => api.delete(API_ENDPOINTS.CART_REMOVE(itemId)),
  clear: () => api.delete(API_ENDPOINTS.CART_CLEAR),
};

/**
 * Wishlist API methods
 */
export const wishlistApi = {
  get: () => api.get<Product[]>(API_ENDPOINTS.WISHLIST),
  add: (productId: string) => api.post(API_ENDPOINTS.WISHLIST_ADD, { productId }),
  remove: (productId: string) => api.delete(API_ENDPOINTS.WISHLIST_REMOVE(productId)),
  toggle: (productId: string) => api.post(`${API_ENDPOINTS.WISHLIST}/toggle`, { productId }),
};

/**
 * Order API methods
 */
export const orderApi = {
  create: (orderData: unknown) => api.post<Order>(API_ENDPOINTS.ORDER_CREATE, orderData),
  getById: (orderId: string) => api.get<Order>(API_ENDPOINTS.ORDER_DETAIL(orderId)),
  getAll: () => api.get<Order[]>(API_ENDPOINTS.ORDERS),
};

// Type definitions
export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  originalPrice: number;
  discountPrice: number;
  offerPercentage: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  category: string;
  description: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}
