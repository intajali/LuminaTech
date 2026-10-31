import { EnvironmentValidationError, validateAppEnvironment } from './env.js';

const validEnvironment = {
  NODE_ENV: 'test',
  PORT: '3000',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/luminatech',
};

describe('validateAppEnvironment', () => {
  it('accepts the example configuration', () => {
    expect(validateAppEnvironment(validEnvironment)).toEqual({
      nodeEnv: 'test',
      port: 3000,
      databaseUrl: validEnvironment.DATABASE_URL,
    });
  });

  it('defaults the port and environment', () => {
    expect(
      validateAppEnvironment({
        DATABASE_URL: 'postgres://postgres:postgres@localhost:5432/luminatech',
      }),
    ).toMatchObject({ nodeEnv: 'development', port: 3000 });
  });

  it('rejects a missing database url', () => {
    expect(() => validateAppEnvironment({ PORT: '3000' })).toThrow(
      EnvironmentValidationError,
    );
  });

  it('rejects an invalid port', () => {
    expect(() =>
      validateAppEnvironment({ ...validEnvironment, PORT: 'not-a-port' }),
    ).toThrow('PORT must be an integer from 1 to 65535');
  });
});
