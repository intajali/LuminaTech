const urlSegment = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;

export const sampleProductId = 'warm-white-bulb';
export const sampleOrderId = '1001';

export const routes = {
  home: '/',
  categories: '/categories',
  search: '/search',
  cart: '/cart',
  account: '/account',
  login: '/login',
  checkout: '/checkout',
} as const;

export function productPath(productId: string): `/product/${string}` {
  assertUrlSegment(productId, 'Product id');
  return `/product/${productId}`;
}

export function orderPath(orderId: string): `/order/${string}` {
  assertUrlSegment(orderId, 'Order id');
  return `/order/${orderId}`;
}

export function singleRouteParam(value: string | string[] | undefined): string {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0];
  }
  return '';
}

function assertUrlSegment(value: string, label: string) {
  if (!urlSegment.test(value)) {
    throw new Error(`${label} must be a single URL segment`);
  }
}
