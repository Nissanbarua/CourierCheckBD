/**
 * Validates and normalizes Bangladeshi phone numbers.
 * @param phone - The input phone number string.
 * @returns Object containing validation status, normalized phone, and operator name.
 */
export const validateAndNormalizeBDPhone = (phone: string): { 
  isValid: boolean; 
  normalizedPhone: string; 
  operator: string; 
} => {
  // Remove all non-numeric characters
  let cleanPhone = phone.replace(/\D/g, '');

  // Handle +880 or 880 prefix
  if (cleanPhone.startsWith('880')) {
    cleanPhone = cleanPhone.substring(3);
  } else if (cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.substring(1);
  }

  // BD mobile numbers are 10 digits after the leading 0 or 880
  if (cleanPhone.length !== 10) {
    return { isValid: false, normalizedPhone: '', operator: 'Unknown' };
  }

  const prefix = cleanPhone.substring(0, 2);
  let operator = 'Unknown';

  const operators: Record<string, string> = {
    '13': 'Teletalk',
    '15': 'Teletalk',
    '14': 'Banglalink',
    '19': 'Banglalink',
    '16': 'Airtel/Robi',
    '18': 'Robi',
    '17': 'Grameenphone',
    '11': 'Citycell', // Mostly defunct but included
  };

    if (operators[prefix]) {
    operator = operators[prefix];
    return {
      isValid: true,
      normalizedPhone: `+880${cleanPhone}`,
      operator
    };
  }

  return { isValid: false, normalizedPhone: '', operator: 'Unknown' };
};
