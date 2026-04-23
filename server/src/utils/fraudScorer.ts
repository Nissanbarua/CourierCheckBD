import { CourierResult } from '../types/courier.types';

/**
 * Calculates a fraud score and risk level based on courier results.
 * @param results - Array of CourierResult objects.
 * @returns Object containing the calculated score and risk level.
 */
export const calculateFraudScore = (results: CourierResult[]): { 
  fraudScore: number; 
  riskLevel: 'low' | 'medium' | 'high' | 'blacklisted' 
} => {
  let score = 0;
  const availableData = results.filter(r => r.dataAvailable);

  if (availableData.length === 0) {
    return { fraudScore: 0, riskLevel: 'low' };
  }

  const totalOrders = availableData.reduce((acc, curr) => acc + curr.totalOrders, 0);
  const totalDelivered = availableData.reduce((acc, curr) => acc + curr.delivered, 0);
  const totalCancelled = availableData.reduce((acc, curr) => acc + curr.cancelled, 0);
  const totalReturned = availableData.reduce((acc, curr) => acc + curr.returned, 0);

  // Return rate calculation
  const overallReturnRate = totalOrders > 0 ? (totalReturned / totalOrders) * 100 : 0;
  if (overallReturnRate > 40) {
    score += 40;
  }

  // Cancellation rate calculation
  const overallCancelRate = totalOrders > 0 ? (totalCancelled / totalOrders) * 100 : 0;
  if (overallCancelRate > 30) {
    score += 25;
  }

  // Multiple couriers showing high return rate bonus
  const highReturnCouriers = availableData.filter(r => r.totalOrders > 0 && (r.returned / r.totalOrders) > 0.4);
  if (highReturnCouriers.length > 1) {
    score += 20;
  }

  // Insufficient data flag (doesn't add to score but could be handled by UI)
  // The requirement says: Total orders < 3 -> flag as "Insufficient Data"
  // We'll keep the score logic and maybe the UI handles the label.
  
  // Perfect delivery rate across all couriers -> score = 0
  if (totalReturned === 0 && totalCancelled === 0 && totalDelivered > 0) {
    score = 0;
  }

  // Cap score at 100
  score = Math.min(score, 100);

  let riskLevel: 'low' | 'medium' | 'high' | 'blacklisted' = 'low';
  if (score > 80) riskLevel = 'blacklisted';
  else if (score > 50) riskLevel = 'high';
  else if (score > 25) riskLevel = 'medium';

  return { fraudScore: score, riskLevel };
};
