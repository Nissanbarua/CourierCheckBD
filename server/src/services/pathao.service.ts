import { CourierResult } from '../types/courier.types';
import { getMockCourierData } from './mock.service';
import axios from 'axios';

/**
 * Fetches customer data from Pathao API.
 * Base URL: https://merchant.pathao.com/api/v1
 */
export const fetchPathaoByPhone = async (phone: string): Promise<CourierResult> => {
  if (process.env.USE_MOCK_API === 'true') {
    const mockResults = await getMockCourierData(phone);
    return mockResults.find(r => r.courierSlug === 'pathao')!;
  }

  try {
    // REAL API IMPLEMENTATION WOULD GO HERE
    // const response = await axios.get('https://merchant.pathao.com/api/v1/...', {
    //   headers: { Authorization: `Bearer ${process.env.PATHAO_API_KEY}` }
    // });
    
    // For now, return error status since we don't have real keys
    return {
      courierName: 'Pathao',
      courierSlug: 'pathao',
      logoUrl: 'https://play-lh.googleusercontent.com/97mXoT_M-k59P1K_O_E_Z_pY_Q7K_Q_Q_Q_Q_Q_Q_Q_Q_Q',
      totalOrders: 0,
      delivered: 0,
      cancelled: 0,
      returned: 0,
      lastOrderDate: null,
      dataAvailable: false,
      apiStatus: 'error'
    };
  } catch (error) {
    console.error('Pathao API Error:', error);
    return {
      courierName: 'Pathao',
      courierSlug: 'pathao',
      logoUrl: 'https://play-lh.googleusercontent.com/97mXoT_M-k59P1K_O_E_Z_pY_Q7K_Q_Q_Q_Q_Q_Q_Q_Q_Q',
      totalOrders: 0,
      delivered: 0,
      cancelled: 0,
      returned: 0,
      lastOrderDate: null,
      dataAvailable: false,
      apiStatus: 'error'
    };
  }
};
