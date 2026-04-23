import { Request, Response, NextFunction } from 'express';
import { validateAndNormalizeBDPhone } from '../utils/phoneValidator';
import { calculateFraudScore } from '../utils/fraudScorer';
import { fetchPathaoByPhone } from '../services/pathao.service';
import { fetchSteadfastByPhone } from '../services/steadfast.service';
import { fetchPaperflyByPhone } from '../services/paperfly.service';
import { fetchRedXByPhone } from '../services/redx.service';
import { fetchECourierByPhone } from '../services/ecourier.service';
import { fetchSundarbanByPhone } from '../services/sundarban.service';
import { fetchCarryBeeByPhone } from '../services/carrybee.service';
import { SearchResponse, CourierResult } from '../types/courier.types';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'searches.log' }),
  ],
});

export const searchByPhone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone } = req.query;
    const { normalizedPhone } = validateAndNormalizeBDPhone(phone as string);

    // Log the search
    logger.info('Search initiated', {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      phone: normalizedPhone
    });

    // Call all courier services in parallel
    const settledResults = await Promise.allSettled([
      fetchPathaoByPhone(normalizedPhone),
      fetchSteadfastByPhone(normalizedPhone),
      fetchPaperflyByPhone(normalizedPhone),
      fetchRedXByPhone(normalizedPhone),
      fetchECourierByPhone(normalizedPhone),
      fetchSundarbanByPhone(normalizedPhone),
      fetchCarryBeeByPhone(normalizedPhone),
    ]);

    const results: CourierResult[] = settledResults.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        // This shouldn't happen much as individual services catch their own errors
        return {
          courierName: 'Unknown',
          courierSlug: 'pathao', // Default slug for fallback
          logoUrl: '',
          totalOrders: 0,
          delivered: 0,
          cancelled: 0,
          returned: 0,
          lastOrderDate: null,
          dataAvailable: false,
          apiStatus: 'error'
        } as CourierResult;
      }
    });

    const { fraudScore, riskLevel } = calculateFraudScore(results);

    const response: SearchResponse = {
      phone: phone as string,
      normalizedPhone,
      results,
      fraudScore,
      riskLevel,
      searchedAt: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
