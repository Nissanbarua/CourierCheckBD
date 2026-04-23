import { CourierResult } from '../types/courier.types';
import { getMockCourierData } from './mock.service';

/**
 * Fetches customer data from Sundarban Courier API.
 */
export const fetchSundarbanByPhone = async (phone: string): Promise<CourierResult> => {
  if (process.env.USE_MOCK_API === 'true') {
    const mockResults = await getMockCourierData(phone);
    return mockResults.find(r => r.courierSlug === 'sundarban')!;
  }

  return {
    courierName: 'Sundarban',
    courierSlug: 'sundarban',
    logoUrl: 'https://sundarbancourier.com.bd/assets/images/logo.png',
    totalOrders: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0,
    lastOrderDate: null,
    dataAvailable: false,
    apiStatus: 'error'
  };
};
