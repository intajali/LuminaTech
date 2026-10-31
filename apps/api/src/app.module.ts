import { Module } from '@nestjs/common';
import { AppEnvironmentModule } from './config/env.module.js';
import { HealthController } from './health/health.controller.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [AppEnvironmentModule, PrismaModule],
  controllers: [HealthController],
})
export class AppModule {}
