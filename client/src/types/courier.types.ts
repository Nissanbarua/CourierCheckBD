export interface CourierResult {
  courierName: string;
  courierSlug: 'pathao' | 'paperfly' | 'steadfast' | 'redx' | 'ecourier' | 'sundarban' | 'carrybee';
  logoUrl: string;
  totalOrders: number;
  delivered: number;
  cancelled: number;
  returned: number;
  lastOrderDate: string | null;
  dataAvailable: boolean;
  apiStatus: 'mock' | 'live' | 'error';
}

export interface SearchResponse {
  phone: string;
  normalizedPhone: string;
  results: CourierResult[];
  fraudScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'blacklisted';
  searchedAt: string;
}
