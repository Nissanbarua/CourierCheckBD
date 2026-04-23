import { CourierResult } from '../types/courier.types';
import { getMockCourierData } from './mock.service';

/**
 * Fetches customer data from Steadfast API.
 * Base URL: https://portal.steadfast.com.bd/api/v1
 */
export const fetchSteadfastByPhone = async (phone: string): Promise<CourierResult> => {
  if (process.env.USE_MOCK_API === 'true') {
    const mockResults = await getMockCourierData(phone);
    return mockResults.find(r => r.courierSlug === 'steadfast')!;
  }

  return {
    courierName: 'Steadfast',
    courierSlug: 'steadfast',
    logoUrl: 'https://steadfast.com.bd/assets/images/logo.png',
    totalOrders: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0,
    lastOrderDate: null,
    dataAvailable: false,
    apiStatus: 'error'
  };
};
