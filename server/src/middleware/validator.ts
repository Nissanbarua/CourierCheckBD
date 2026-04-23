import { Request, Response, NextFunction } from 'express';
import { query, validationResult } from 'express-validator';
import { z } from 'zod';
import { validateAndNormalizeBDPhone } from '../utils/phoneValidator';

const phoneSchema = z.string().refine((val) => {
  const { isValid } = validateAndNormalizeBDPhone(val);
  return isValid;
}, {
  message: "Invalid Bangladeshi phone number"
});

export const validateSearchQuery = [
  query('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .custom((value) => {
      const { isValid } = validateAndNormalizeBDPhone(value);
      if (!isValid) {
        throw new Error('Invalid Bangladeshi phone number');
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
