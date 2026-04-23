import { CourierResult } from '../types/courier.types';
import { getMockCourierData } from './mock.service';

/**
 * Fetches customer data from eCourier API.
 * Base URL: https://ecourier.com.bd/api
 */
export const fetchECourierByPhone = async (phone: string): Promise<CourierResult> => {
  if (process.env.USE_MOCK_API === 'true') {
    const mockResults = await getMockCourierData(phone);
    return mockResults.find(r => r.courierSlug === 'ecourier')!;
  }

  return {
    courierName: 'eCourier',
    courierSlug: 'ecourier',
    logoUrl: 'https://ecourier.com.bd/wp-content/uploads/2019/04/eCourier-logo.png',
    totalOrders: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0,
    lastOrderDate: null,
    dataAvailable: false,
    apiStatus: 'error'
  };
};
