import { CourierResult } from '../types/courier.types';

/**
 * Generates realistic mock courier data for a given phone number.
 * @param phone - The normalized phone number.
 * @returns Array of CourierResult objects.
 */
export const getMockCourierData = async (phone: string): Promise<CourierResult[]> => {
  // Artificial delay to simulate real API latency (300-800ms)
  const delay = Math.floor(Math.random() * 500) + 300;
  await new Promise(resolve => setTimeout(resolve, delay));

  // Use the last digit of the phone number to seed some pseudo-randomness
  const seed = parseInt(phone.slice(-1)) || 0;

  const couriers: { name: string; slug: CourierResult['courierSlug']; logo: string }[] = [
    { name: 'Pathao', slug: 'pathao', logo: 'https://i.ibb.co.com/vxtbS9zY/id-Sr9k7j-Mr-1776972925424.jpg' },
    { name: 'Steadfast', slug: 'steadfast', logo:'https://i.ibb.co.com/WNyh2Wtk/Pixelax-id-Y2-PPw7n-0.png' },
    { name: 'Paperfly', slug: 'paperfly', logo: 'https://i.ibb.co.com/67mpZYc3/id-Ly-Mn-UJ1o-1776972975987.jpg' },
    { name: 'RedX', slug: 'redx', logo: 'https://i.ibb.co.com/HpbZHyNy/idqw-Mn-IIoj-logos.png' },
    { name: 'eCourier', slug: 'ecourier', logo: 'https://i.ibb.co.com/1Jd4vcKR/idw-Vbmiy-Jm-logos.jpg' },
    { name: 'Sundarban', slug: 'sundarban', logo: 'https://i.ibb.co.com/tT7105jW/id1-CW5-Awf-Q-logos.jpg' },
    { name: 'CarryBee', slug: 'carrybee', logo: 'https://i.ibb.co.com/fTj895K/iddejr-YOSB-logos.png' }, // Placeholder logo similar to Steadfast/Bee
  ];

  // One courier always returning dataAvailable: false (let's pick based on seed)
  const emptyCourierIndex = seed % couriers.length;

  return couriers.map((c, index) => {
    const isDataAvailable = index !== emptyCourierIndex;
    
    if (!isDataAvailable) {
      return {
        courierName: c.name,
        courierSlug: c.slug,
        logoUrl: c.logo,
        totalOrders: 0,
        delivered: 0,
        cancelled: 0,
        returned: 0,
        lastOrderDate: null,
        dataAvailable: false,
        apiStatus: 'mock'
      };
    }

    // Generate random stats
    const total = Math.floor(Math.random() * 15) + (seed % 5);
    const returned = Math.floor(Math.random() * (total * 0.4));
    const cancelled = Math.floor(Math.random() * (total * 0.2));
    const delivered = total - returned - cancelled;

    return {
      courierName: c.name,
      courierSlug: c.slug,
      logoUrl: c.logo,
      totalOrders: total,
      delivered,
      cancelled,
      returned,
      lastOrderDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      dataAvailable: true,
      apiStatus: 'mock'
    };
  });
};
