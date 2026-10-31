import { Global, Module } from '@nestjs/common';
import { validateAppEnvironment } from './env.js';

export const APP_ENVIRONMENT = Symbol('APP_ENVIRONMENT');

@Global()
@Module({
  providers: [
    {
      provide: APP_ENVIRONMENT,
      useFactory: () => validateAppEnvironment(process.env),
    },
  ],
  exports: [APP_ENVIRONMENT],
})
export class AppEnvironmentModule {}
