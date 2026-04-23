import { CourierResult } from '../types/courier.types';
import { getMockCourierData } from './mock.service';

/**
 * Fetches customer data from Paperfly API.
 * Base URL: https://api.paperfly.com.bd/api
 */
export const fetchPaperflyByPhone = async (phone: string): Promise<CourierResult> => {
  if (process.env.USE_MOCK_API === 'true') {
    const mockResults = await getMockCourierData(phone);
    return mockResults.find(r => r.courierSlug === 'paperfly')!;
  }

  return {
    courierName: 'Paperfly',
    courierSlug: 'paperfly',
    logoUrl: 'https://paperfly.com.bd/images/logo.png',
    totalOrders: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0,
    lastOrderDate: null,
    dataAvailable: false,
    apiStatus: 'error'
  };
};
