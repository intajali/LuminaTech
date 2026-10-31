import type { INestApplication } from '@nestjs/common';
import { HttpErrorResponseFilter } from './common/http-error-response.filter.js';

export function setApiPrefixAndExceptionFilter(app: INestApplication): void {
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpErrorResponseFilter());
}
