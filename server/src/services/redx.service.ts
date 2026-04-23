import { CourierResult } from '../types/courier.types';
import { getMockCourierData } from './mock.service';

/**
 * Fetches customer data from RedX API.
 * Base URL: https://openapi.redx.com.bd/v1.0.0-beta
 */
export const fetchRedXByPhone = async (phone: string): Promise<CourierResult> => {
  if (process.env.USE_MOCK_API === 'true') {
    const mockResults = await getMockCourierData(phone);
    return mockResults.find(r => r.courierSlug === 'redx')!;
  }

  return {
    courierName: 'RedX',
    courierSlug: 'redx',
    logoUrl: 'https://redx.com.bd/assets/images/redx-logo.svg',
    totalOrders: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0,
    lastOrderDate: null,
    dataAvailable: false,
    apiStatus: 'error'
  };
};
