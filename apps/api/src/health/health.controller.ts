import { Controller, Get } from '@nestjs/common';
import { API_SERVICE_NAME, type HealthResponse } from '@luminatech/contracts';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: API_SERVICE_NAME,
    };
  }
}
