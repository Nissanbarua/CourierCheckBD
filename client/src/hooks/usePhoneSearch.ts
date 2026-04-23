import { useQuery } from '@tanstack/react-query';
import { searchPhone } from '../services/api';
import { SearchResponse } from '../types/courier.types';

/**
 * Custom hook to search for customer history using TanStack Query.
 * @param phone - The phone number to search.
 * @param enabled - Whether the query should be enabled.
 */
export const usePhoneSearch = (phone: string, enabled: boolean = false) => {
  return useQuery<SearchResponse, Error>({
    queryKey: ['search', phone],
    queryFn: () => searchPhone(phone),
    enabled: enabled && phone.length >= 10,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1,
  });
};
