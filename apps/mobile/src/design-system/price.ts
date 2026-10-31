/** `amount` is an integer in minor currency units, such as cents. */
export type Price = {
  amount: number;
  currency: string;
};

const currencyCode = /^[A-Z]{3}$/;

export function formatPrice(price: Price, locale: string = 'en-US'): string {
  if (!Number.isInteger(price.amount)) {
    throw new Error('Price amount must be an integer in minor units');
  }
  if (!currencyCode.test(price.currency)) {
    throw new Error('Price currency must be a 3-letter ISO code');
  }

  return new Intl.NumberFormat(locale, {
    currency: price.currency,
    style: 'currency',
  }).format(price.amount / 100);
}
