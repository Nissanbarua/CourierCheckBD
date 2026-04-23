import { Router } from 'express';
import { searchByPhone } from '../controllers/search.controller';
import { validateSearchQuery } from '../middleware/validator';
import { searchRateLimiter } from '../middleware/rateLimiter';

const router = Router();

/**
 * @route GET /api/v1/search
 * @desc Search for customer history by phone number
 * @access Public
 */
router.get('/', searchRateLimiter, validateSearchQuery, searchByPhone);

export default router;
