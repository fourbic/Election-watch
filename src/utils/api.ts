/**
 * API utility for Dexter platform
 * Handles all communication with backend services
 */

import { mockApi } from './mockApi';

interface RequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string | number | boolean>;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

// Determine if we're in development mode
const isDevelopment = import.meta.env.MODE === 'development';

// API base URL - will be replaced with actual backend URL in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// Default request timeout in milliseconds
const DEFAULT_TIMEOUT = 30000;

/**
 * Creates a fetch request with standardized options
 * @param endpoint - API endpoint
 * @param options - Request options
 */
const createRequest = async <T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
  // In development, use mock API
  if (isDevelopment) {
    return mockApi(endpoint, options);
  }

  const {
    timeout = DEFAULT_TIMEOUT,
    params,
    headers = {},
    ...fetchOptions
  } = options;

  // Build URL with query parameters
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  // Create fetch Promise with timeout
  const fetchPromise = fetch(url.toString(), {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  // Create timeout Promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${timeout}ms`));
    }, timeout);
  });

  try {
    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

const api = {
  /**
   * Send GET request to API
   */
  get: <T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
    return createRequest<T>(endpoint, { ...options, method: 'GET' });
  },

  /**
   * Send POST request to API
   */
  post: <T>(endpoint: string, data: unknown, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
    return createRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Send PUT request to API
   */
  put: <T>(endpoint: string, data: unknown, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
    return createRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Send PATCH request to API
   */
  patch: <T>(endpoint: string, data: unknown, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
    return createRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Send DELETE request to API
   */
  delete: <T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
    return createRequest<T>(endpoint, { ...options, method: 'DELETE' });
  },
};

export default api;
