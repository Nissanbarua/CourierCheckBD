import { CourierResult } from '../types/courier.types';
import { getMockCourierData } from './mock.service';

/**
 * Fetches customer data from CarryBee API.
 */
export const fetchCarryBeeByPhone = async (phone: string): Promise<CourierResult> => {
  if (process.env.USE_MOCK_API === 'true') {
    const mockResults = await getMockCourierData(phone);
    return mockResults.find(r => r.courierSlug === 'carrybee')!;
  }

  return {
    courierName: 'CarryBee',
    courierSlug: 'carrybee',
    logoUrl: 'https://i.imgur.com/8Q8X8X8.png', // Placeholder
    totalOrders: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0,
    lastOrderDate: null,
    dataAvailable: false,
    apiStatus: 'error'
  };
};
