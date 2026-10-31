/**
 * Local stand-in for the catalog.
 * Home reads this module only. It does not call a product API.
 * Image names point at bundled files in assets/catalog, never at a URL.
 * Replace a PNG and keep its file name when real photography is ready.
 */
const urlSegment = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;

export const catalogImageKeys = [
  'banner-trade',
  'bulb',
  'dimmer',
  'panel',
  'cable',
  'breaker',
  'socket',
  'lighting',
  'switches',
  'cable-category',
  'protection',
] as const;

export type CatalogImageKey = (typeof catalogImageKeys)[number];

export type HomeProduct = {
  id: string;
  name: string;
  detail: string;
  amount: number;
  currency: 'USD';
  image: CatalogImageKey;
};

export type HomeCategory = {
  id: string;
  name: string;
  image: CatalogImageKey;
};

export type HomeBanner = {
  title: string;
  message: string;
  productId: string;
  image: CatalogImageKey;
};

export type HomeCatalog = {
  banner: HomeBanner;
  categories: readonly HomeCategory[];
  featured: readonly HomeProduct[];
  popularElectrical: readonly HomeProduct[];
  recentlyViewed: readonly HomeProduct[];
};

export const homeCatalog: HomeCatalog = {
  banner: {
    title: 'Panel lights for the job',
    message: 'Trade sizes are in the featured list.',
    productId: 'ceiling-panel',
    image: 'banner-trade',
  },
  categories: [
    { id: 'lighting', name: 'Lighting', image: 'lighting' },
    { id: 'switches', name: 'Switches', image: 'switches' },
    { id: 'cable', name: 'Cable', image: 'cable-category' },
    { id: 'protection', name: 'Protection', image: 'protection' },
  ],
  featured: [
    {
      id: 'warm-white-bulb',
      name: 'Warm white bulb',
      detail: 'E27 · 9 W',
      amount: 1299,
      currency: 'USD',
      image: 'bulb',
    },
    {
      id: 'dimmer-switch',
      name: 'LED dimmer',
      detail: 'Trailing edge',
      amount: 2499,
      currency: 'USD',
      image: 'dimmer',
    },
    {
      id: 'ceiling-panel',
      name: 'Ceiling panel',
      detail: '600 mm · 24 W',
      amount: 4599,
      currency: 'USD',
      image: 'panel',
    },
  ],
  popularElectrical: [
    {
      id: 'copper-cable',
      name: 'Copper cable',
      detail: '2.5 mm² · 10 m',
      amount: 1899,
      currency: 'USD',
      image: 'cable',
    },
    {
      id: 'circuit-breaker',
      name: 'Circuit breaker',
      detail: '20 A · single pole',
      amount: 890,
      currency: 'USD',
      image: 'breaker',
    },
    {
      id: 'socket-outlet',
      name: 'Double socket',
      detail: 'Switched · 13 A',
      amount: 1599,
      currency: 'USD',
      image: 'socket',
    },
  ],
  recentlyViewed: [
    {
      id: 'warm-white-bulb',
      name: 'Warm white bulb',
      detail: 'E27 · 9 W',
      amount: 1299,
      currency: 'USD',
      image: 'bulb',
    },
    {
      id: 'copper-cable',
      name: 'Copper cable',
      detail: '2.5 mm² · 10 m',
      amount: 1899,
      currency: 'USD',
      image: 'cable',
    },
  ],
};

export function catalogRecords(catalog: HomeCatalog = homeCatalog) {
  return [
    catalog.banner,
    ...catalog.categories,
    ...catalog.featured,
    ...catalog.popularElectrical,
    ...catalog.recentlyViewed,
  ];
}

export function assertLocalCatalog(catalog: HomeCatalog = homeCatalog) {
  const imageKeys = new Set<string>(catalogImageKeys);
  const productIds = new Set(
    [...catalog.featured, ...catalog.popularElectrical].map(
      (product) => product.id,
    ),
  );

  if (!productIds.has(catalog.banner.productId)) {
    throw new Error('Banner must open a product in the local catalog');
  }

  for (const product of catalog.recentlyViewed) {
    if (!productIds.has(product.id)) {
      throw new Error(
        'Recently viewed products must come from the local catalog',
      );
    }
  }

  for (const record of catalogRecords(catalog)) {
    const fields = Object.values(record).filter(
      (value): value is string => typeof value === 'string',
    );
    for (const field of fields) {
      if (field.includes('://')) {
        throw new Error('Catalog data cannot reference a remote URL');
      }
    }
    if ('image' in record && !imageKeys.has(record.image)) {
      throw new Error('Catalog image must be a bundled placeholder');
    }
    if ('id' in record && !urlSegment.test(record.id)) {
      throw new Error('Catalog id must be a single URL segment');
    }
    if ('amount' in record && !Number.isInteger(record.amount)) {
      throw new Error('Catalog price must be an integer in minor units');
    }
  }
}
