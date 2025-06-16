/**
 * Mock API implementation for Dexter platform
 * Used for development and testing before backend integration
 */

import { RequestOptions, ApiResponse } from './types';
import mockData from './mockData';

// Helper to simulate API delay
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Helper to simulate API errors (for testing error handling)
const simulateError = (probability = 0.05): boolean => {
  return Math.random() < probability;
};

/**
 * Mock API service object with methods for different endpoints
 * Simulates real API behavior with delays and occasional errors
 */
export const mockApi = async <T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
  // Simulate network delay (200-800ms)
  await delay(200 + Math.random() * 600);

  // Simulate occasional errors
  if (simulateError()) {
    return {
      success: false,
      error: 'Simulated API error for testing purposes',
    };
  }

  // Parse endpoint and method
  const method = options.method?.toUpperCase() || 'GET';
  const path = endpoint.toLowerCase();
  let data: unknown;

  // Handle different endpoints
  switch (true) {
    case path.startsWith('/narratives'):
      if (method === 'GET') {
        data = mockData.narratives;
      }
      break;

    case path.startsWith('/actors'):
      if (method === 'GET') {
        data = mockData.actors;
      }
      break;

    case path.startsWith('/alerts'):
      if (method === 'GET') {
        data = mockData.alerts;
      }
      break;

    case path.startsWith('/reports'):
      if (method === 'GET') {
        data = mockData.reports;
      }
      break;

    default:
      return {
        success: false,
        error: `Endpoint not found: ${endpoint}`,
      };
  }

  return {
    success: true,
    data: data as T,
    meta: {
      total: Array.isArray(data) ? data.length : undefined,
      page: 1,
      limit: 10,
    },
  };
};
