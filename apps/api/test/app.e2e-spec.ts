import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { setApiPrefixAndExceptionFilter } from './../src/app.setup.js';

describe('API', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setApiPrefixAndExceptionFilter(app);
    await app.init();
  });

  it('GET /api/v1/health returns ok', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect({
        status: 'ok',
        service: 'luminatech-api',
      });
  });

  it('formats unknown routes through the error filter', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/missing');

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      statusCode: 404,
      error: 'Not Found',
      path: '/api/v1/missing',
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
