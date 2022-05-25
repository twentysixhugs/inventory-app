import * as express from 'express';
import { ResponseError } from 'src/types';

export function sendValidationError(next: express.NextFunction) {
  const err: ResponseError = new Error('403: Validation error');
  err.status = 403;
  next(err);
}
