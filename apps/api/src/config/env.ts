export type AppEnvironment = {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  databaseUrl: string;
};

const allowedNodeEnvironments = ['development', 'test', 'production'] as const;

type NodeEnvironment = (typeof allowedNodeEnvironments)[number];

export class EnvironmentValidationError extends Error {
  constructor(details: string) {
    super(`Invalid environment configuration: ${details}`);
    this.name = 'EnvironmentValidationError';
  }
}

export function validateAppEnvironment(
  source: NodeJS.ProcessEnv = process.env,
): AppEnvironment {
  return {
    nodeEnv: readNodeEnvironment(source),
    port: readListenPort(source),
    databaseUrl: readPostgresConnectionString(source),
  };
}

function readNodeEnvironment(source: NodeJS.ProcessEnv): NodeEnvironment {
  const nodeEnvironment = source.NODE_ENV ?? 'development';
  if (!allowedNodeEnvironments.includes(nodeEnvironment as NodeEnvironment)) {
    throw new EnvironmentValidationError(
      'NODE_ENV must be development, test, or production',
    );
  }

  return nodeEnvironment as NodeEnvironment;
}

function readListenPort(source: NodeJS.ProcessEnv): number {
  const portValue =
    source.PORT === undefined || source.PORT === '' ? '3000' : source.PORT;
  const port = Number(portValue);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new EnvironmentValidationError(
      'PORT must be an integer from 1 to 65535',
    );
  }

  return port;
}

function readPostgresConnectionString(source: NodeJS.ProcessEnv): string {
  const databaseUrl = source.DATABASE_URL;
  if (
    databaseUrl === undefined ||
    (!databaseUrl.startsWith('postgresql://') &&
      !databaseUrl.startsWith('postgres://'))
  ) {
    throw new EnvironmentValidationError(
      'DATABASE_URL must be a PostgreSQL connection string',
    );
  }

  return databaseUrl;
}
