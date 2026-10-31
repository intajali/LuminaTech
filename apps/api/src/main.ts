import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { setApiPrefixAndExceptionFilter } from './app.setup.js';
import { validateAppEnvironment } from './config/env.js';
import { AppModule } from './app.module.js';

const environment = validateAppEnvironment(process.env);

async function startApiServer() {
  const app = await NestFactory.create(AppModule);
  setApiPrefixAndExceptionFilter(app);
  await app.listen(environment.port);
}

await startApiServer();
