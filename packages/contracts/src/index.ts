export const APP_NAME = 'LuminaTech';

export const API_SERVICE_NAME = 'luminatech-api';

export type HealthResponse = {
  status: 'ok';
  service: typeof API_SERVICE_NAME;
};
