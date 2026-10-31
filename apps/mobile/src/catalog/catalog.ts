import { type CatalogImageKey } from './home-catalog';

/**
 * Local catalog for category browsing and search.
 * Screens read this module only. They do not call a product API.
 * Images are bundled placeholder keys, never remote URLs.
 */

export const catalogBrands = ['Lumina', 'TradeLine', 'Northwire'] as const;

export type CatalogBrand = (typeof catalogBrands)[number];

export const catalogSorts = [
  'featured',
  'price-asc',
  'price-desc',
  'name',
] as const;

export type CatalogSort = (typeof catalogSorts)[number];

export type CatalogAvailability = 'all' | 'in-stock';

export type CatalogSubcategory = {
  id: string;
  name: string;
};

export type CatalogCategory = {
  id: string;
  name: string;
  image: CatalogImageKey;
  subcategories: readonly CatalogSubcategory[];
};

export type CatalogProduct = {
  id: string;
  name: string;
  detail: string;
  amount: number;
  currency: 'USD';
  image: CatalogImageKey;
  categoryId: string;
  subcategoryId: string;
  brand: CatalogBrand;
  inStock: boolean;
  featuredRank: number;
};

export type CatalogFilters = {
  query: string;
  categoryId: string;
  subcategoryId: string;
  brand: CatalogBrand | '';
  availability: CatalogAvailability;
  sort: CatalogSort;
};

export const defaultCatalogFilters: CatalogFilters = {
  query: '',
  categoryId: '',
  subcategoryId: '',
  brand: '',
  availability: 'all',
  sort: 'featured',
};

export const catalogCategories: readonly CatalogCategory[] = [
  {
    id: 'lighting',
    name: 'Lighting',
    image: 'lighting',
    subcategories: [
      { id: 'bulbs', name: 'Bulbs' },
      { id: 'panels', name: 'Panels' },
    ],
  },
  {
    id: 'switches',
    name: 'Switches',
    image: 'switches',
    subcategories: [
      { id: 'dimmers', name: 'Dimmers' },
      { id: 'outlets', name: 'Outlets' },
    ],
  },
  {
    id: 'cable',
    name: 'Cable',
    image: 'cable-category',
    subcategories: [
      { id: 'building-wire', name: 'Building wire' },
      { id: 'conduit', name: 'Conduit' },
    ],
  },
  {
    id: 'protection',
    name: 'Protection',
    image: 'protection',
    subcategories: [
      { id: 'breakers', name: 'Breakers' },
      { id: 'surge', name: 'Surge' },
    ],
  },
];

export const catalogProducts: readonly CatalogProduct[] = [
  {
    id: 'warm-white-bulb',
    name: 'Warm white bulb',
    detail: 'E27 · 9 W',
    amount: 1299,
    currency: 'USD',
    image: 'bulb',
    categoryId: 'lighting',
    subcategoryId: 'bulbs',
    brand: 'Lumina',
    inStock: true,
    featuredRank: 0,
  },
  {
    id: 'ceiling-panel',
    name: 'Ceiling panel',
    detail: '600 mm · 24 W',
    amount: 4599,
    currency: 'USD',
    image: 'panel',
    categoryId: 'lighting',
    subcategoryId: 'panels',
    brand: 'Lumina',
    inStock: true,
    featuredRank: 1,
  },
  {
    id: 'dimmer-switch',
    name: 'LED dimmer',
    detail: 'Trailing edge',
    amount: 2499,
    currency: 'USD',
    image: 'dimmer',
    categoryId: 'switches',
    subcategoryId: 'dimmers',
    brand: 'Lumina',
    inStock: true,
    featuredRank: 2,
  },
  {
    id: 'copper-cable',
    name: 'Copper cable',
    detail: '2.5 mm² · 10 m',
    amount: 1899,
    currency: 'USD',
    image: 'cable',
    categoryId: 'cable',
    subcategoryId: 'building-wire',
    brand: 'Northwire',
    inStock: true,
    featuredRank: 3,
  },
  {
    id: 'cool-white-bulb',
    name: 'Cool white bulb',
    detail: 'E27 · 12 W',
    amount: 990,
    currency: 'USD',
    image: 'bulb',
    categoryId: 'lighting',
    subcategoryId: 'bulbs',
    brand: 'TradeLine',
    inStock: true,
    featuredRank: 4,
  },
  {
    id: 'socket-outlet',
    name: 'Double socket',
    detail: 'Switched · 13 A',
    amount: 1599,
    currency: 'USD',
    image: 'socket',
    categoryId: 'switches',
    subcategoryId: 'outlets',
    brand: 'Lumina',
    inStock: true,
    featuredRank: 5,
  },
  {
    id: 'recessed-downlight',
    name: 'Recessed downlight',
    detail: '90 mm · 8 W',
    amount: 2199,
    currency: 'USD',
    image: 'panel',
    categoryId: 'lighting',
    subcategoryId: 'panels',
    brand: 'TradeLine',
    inStock: true,
    featuredRank: 6,
  },
  {
    id: 'usb-socket',
    name: 'USB socket',
    detail: 'Type A and C',
    amount: 2299,
    currency: 'USD',
    image: 'socket',
    categoryId: 'switches',
    subcategoryId: 'outlets',
    brand: 'TradeLine',
    inStock: true,
    featuredRank: 7,
  },
  {
    id: 'candle-bulb',
    name: 'Candle bulb',
    detail: 'E14 · 4 W',
    amount: 799,
    currency: 'USD',
    image: 'bulb',
    categoryId: 'lighting',
    subcategoryId: 'bulbs',
    brand: 'Lumina',
    inStock: false,
    featuredRank: 8,
  },
  {
    id: 'smart-dimmer',
    name: 'Smart dimmer',
    detail: 'Two-wire',
    amount: 3899,
    currency: 'USD',
    image: 'dimmer',
    categoryId: 'switches',
    subcategoryId: 'dimmers',
    brand: 'TradeLine',
    inStock: false,
    featuredRank: 9,
  },
  {
    id: 'flexible-cable',
    name: 'Flexible cable',
    detail: '1.5 mm² · 25 m',
    amount: 2749,
    currency: 'USD',
    image: 'cable',
    categoryId: 'cable',
    subcategoryId: 'building-wire',
    brand: 'Northwire',
    inStock: true,
    featuredRank: 10,
  },
  {
    id: 'pvc-conduit',
    name: 'PVC conduit',
    detail: '20 mm · 3 m',
    amount: 690,
    currency: 'USD',
    image: 'cable',
    categoryId: 'cable',
    subcategoryId: 'conduit',
    brand: 'Northwire',
    inStock: true,
    featuredRank: 11,
  },
  {
    id: 'circuit-breaker',
    name: 'Circuit breaker',
    detail: '20 A · single pole',
    amount: 890,
    currency: 'USD',
    image: 'breaker',
    categoryId: 'protection',
    subcategoryId: 'breakers',
    brand: 'TradeLine',
    inStock: true,
    featuredRank: 12,
  },
  {
    id: 'rcbo',
    name: 'RCBO',
    detail: '16 A · 30 mA',
    amount: 2899,
    currency: 'USD',
    image: 'breaker',
    categoryId: 'protection',
    subcategoryId: 'breakers',
    brand: 'TradeLine',
    inStock: false,
    featuredRank: 13,
  },
  {
    id: 'surge-protector',
    name: 'Surge protector',
    detail: 'Type 2',
    amount: 3499,
    currency: 'USD',
    image: 'protection',
    categoryId: 'protection',
    subcategoryId: 'surge',
    brand: 'Lumina',
    inStock: true,
    featuredRank: 14,
  },
];

export function categoryById(categoryId: string) {
  return catalogCategories.find((category) => category.id === categoryId);
}

export function subcategoryById(categoryId: string, subcategoryId: string) {
  return categoryById(categoryId)?.subcategories.find(
    (subcategory) => subcategory.id === subcategoryId,
  );
}

export function filterCatalog(
  filters: CatalogFilters,
  products: readonly CatalogProduct[] = catalogProducts,
): CatalogProduct[] {
  const query = filters.query.trim().toLowerCase();
  const subcategoryId = matchingSubcategory(filters);
  const matched = products.filter((product) => {
    if (filters.categoryId && product.categoryId !== filters.categoryId) {
      return false;
    }
    if (subcategoryId && product.subcategoryId !== subcategoryId) {
      return false;
    }
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }
    if (filters.availability === 'in-stock' && !product.inStock) {
      return false;
    }
    if (!query) {
      return true;
    }
    const haystack =
      `${product.name} ${product.detail} ${product.brand}`.toLowerCase();
    return haystack.includes(query);
  });

  return [...matched].sort((left, right) =>
    compareProducts(left, right, filters.sort),
  );
}

export function describeCatalogResults(
  count: number,
  filters: CatalogFilters,
): string {
  const category = categoryById(filters.categoryId);
  const subcategory = subcategoryById(
    filters.categoryId,
    matchingSubcategory(filters),
  );
  const sortLabel = {
    featured: '',
    'price-asc': 'Low to high',
    'price-desc': 'High to low',
    name: 'Name',
  }[filters.sort];
  const details = [
    category?.name,
    subcategory?.name,
    filters.brand,
    filters.availability === 'in-stock' ? 'In stock' : '',
    filters.query.trim() ? `“${filters.query.trim()}”` : '',
    sortLabel,
  ].filter((part): part is string => Boolean(part));
  const noun = count === 1 ? 'product' : 'products';
  if (details.length === 0) {
    return `${count} ${noun}`;
  }
  return `${count} ${noun} · ${details.join(' · ')}`;
}

function matchingSubcategory(filters: CatalogFilters): string {
  if (!filters.subcategoryId) {
    return '';
  }
  if (!filters.categoryId) {
    return filters.subcategoryId;
  }
  return subcategoryById(filters.categoryId, filters.subcategoryId)
    ? filters.subcategoryId
    : '';
}

function compareProducts(
  left: CatalogProduct,
  right: CatalogProduct,
  sort: CatalogSort,
): number {
  if (sort === 'price-asc' || sort === 'price-desc') {
    const difference = left.amount - right.amount;
    if (difference !== 0) {
      return sort === 'price-asc' ? difference : -difference;
    }
  }
  if (sort === 'name') {
    const byName = left.name.localeCompare(right.name);
    if (byName !== 0) {
      return byName;
    }
  }
  return left.featuredRank - right.featuredRank;
}
