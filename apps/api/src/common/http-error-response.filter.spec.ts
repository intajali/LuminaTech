import { type ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorResponseFilter } from './http-error-response.filter.js';

function createMockHttpArgumentsHost(url: string) {
  const json = vi.fn();
  const status = vi.fn(() => ({ json }));
  const host = {
    switchToHttp: () => ({
      getResponse: () => ({ status }),
      getRequest: () => ({ method: 'GET', url, originalUrl: url }),
    }),
  } as ArgumentsHost;

  return { host, status, json };
}

describe('HttpErrorResponseFilter', () => {
  const filter = new HttpErrorResponseFilter();

  it('formats HTTP exceptions', () => {
    const { host, status, json } =
      createMockHttpArgumentsHost('/api/v1/missing');

    filter.catch(new HttpException('Not Found', HttpStatus.NOT_FOUND), host);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 404,
        error: 'Not Found',
        message: 'Not Found',
        path: '/api/v1/missing',
      }),
    );
  });

  it('hides unexpected error details', () => {
    const { host, status, json } =
      createMockHttpArgumentsHost('/api/v1/health');

    filter.catch(new Error('database password leaked'), host);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        message: 'Internal server error',
      }),
    );
    expect(JSON.stringify(json.mock.calls)).not.toContain('database password');
  });
});
