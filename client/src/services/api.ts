import axios from 'axios';
import { SearchResponse } from '../types/courier.types';

const API_BASE_URL = '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Searches for customer data by phone number.
 * @param phone - The phone number to search.
 * @returns SearchResponse object.
 */
export const searchPhone = async (phone: string): Promise<SearchResponse> => {
  const response = await apiClient.get<SearchResponse>(`/search?phone=${encodeURIComponent(phone)}`);
  return response.data;
};
