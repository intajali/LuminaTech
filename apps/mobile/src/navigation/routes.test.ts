import { describe, expect, it } from 'vitest';

import {
  safeAreaEdges,
  stackScreenEdges,
  tabScreenEdges,
} from '../design-system/layout';

import {
  orderPath,
  productPath,
  routes,
  sampleOrderId,
  sampleProductId,
  singleRouteParam,
} from './routes';

describe('app routes', () => {
  it('keeps tab and stack paths addressable without a group prefix', () => {
    expect(routes).toEqual({
      home: '/',
      categories: '/categories',
      search: '/search',
      cart: '/cart',
      account: '/account',
      login: '/login',
      checkout: '/checkout',
    });
    expect(productPath(sampleProductId)).toBe('/product/warm-white-bulb');
    expect(orderPath(sampleOrderId)).toBe('/order/1001');
  });

  it('rejects ids that would break a deep link segment', () => {
    expect(() => productPath('bulb/extra')).toThrow(
      'Product id must be a single URL segment',
    );
    expect(() => orderPath('')).toThrow(
      'Order id must be a single URL segment',
    );
  });

  it('reads one dynamic segment from a route param', () => {
    expect(singleRouteParam('1001')).toBe('1001');
    expect(singleRouteParam(['1001', 'extra'])).toBe('1001');
    expect(singleRouteParam(undefined)).toBe('');
  });
});

describe('safe area edges', () => {
  it('gives tab screens the top inset and stack screens the bottom inset', () => {
    expect(tabScreenEdges).toEqual(['top', 'left', 'right']);
    expect(stackScreenEdges).toEqual(['left', 'right', 'bottom']);
    expect(safeAreaEdges).toEqual(['top', 'right', 'bottom', 'left']);
    for (const edge of [...tabScreenEdges, ...stackScreenEdges]) {
      expect(safeAreaEdges).toContain(edge);
    }
  });
});
