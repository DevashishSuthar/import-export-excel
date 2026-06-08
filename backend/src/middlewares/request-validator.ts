import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

import { failure } from '@/helpers/api';
import { COMMON_MESSAGES } from '@/constants/messages';
import { UNPROCESSABLE_ENTITY } from '@/constants/http-status-code';

type RequestProperty = 'body' | 'query' | 'params';

const requestValidatorMiddleware = (
  schemas: ZodType[],
  properties: RequestProperty[]
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (schemas.length !== properties.length) {
      failure(res, COMMON_MESSAGES.UNKNOWN_ERROR);
      return;
    }

    const errors: any[] = [];

    schemas.forEach((schema, index) => {
      const property = properties[index];
      const data = req[property as RequestProperty];

      const result = schema.safeParse(data);

      if (!result.success) {
        const zodError: ZodError = result.error;

        const formattedErrors = zodError.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        errors.push(...formattedErrors);
      }

    });

    if (errors.length) {
      failure(
        res,
        COMMON_MESSAGES.VALIDATION_ERROR,
        errors,
        UNPROCESSABLE_ENTITY
      );
      return;
    }
    
    next();
  };
};

export default requestValidatorMiddleware;