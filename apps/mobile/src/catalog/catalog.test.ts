import { describe, expect, it } from 'vitest';

import {
  catalogCategories,
  catalogProducts,
  defaultCatalogFilters,
  describeCatalogResults,
  filterCatalog,
  type CatalogFilters,
} from './catalog';

function filters(overrides: Partial<CatalogFilters> = {}): CatalogFilters {
  return { ...defaultCatalogFilters, ...overrides };
}

describe('filterCatalog', () => {
  it('keeps the full local list until a filter is applied', () => {
    expect(filterCatalog(filters()).map((product) => product.id)).toEqual(
      catalogProducts.map((product) => product.id),
    );
    expect(JSON.stringify(catalogProducts).includes('://')).toBe(false);
    expect(JSON.stringify(catalogCategories).includes('://')).toBe(false);
  });

  it('narrows products by category and subcategory', () => {
    const lighting = filterCatalog(filters({ categoryId: 'lighting' }));
    const bulbs = filterCatalog(
      filters({ categoryId: 'lighting', subcategoryId: 'bulbs' }),
    );

    expect(lighting.every((product) => product.categoryId === 'lighting')).toBe(
      true,
    );
    expect(lighting.length).toBeLessThan(catalogProducts.length);
    expect(bulbs.map((product) => product.id)).toEqual([
      'warm-white-bulb',
      'cool-white-bulb',
      'candle-bulb',
    ]);
  });

  it('drops a subcategory that belongs to another category', () => {
    const lighting = filterCatalog(
      filters({ categoryId: 'lighting', subcategoryId: 'breakers' }),
    );

    expect(lighting.every((product) => product.categoryId === 'lighting')).toBe(
      true,
    );
    expect(lighting.some((product) => product.subcategoryId === 'bulbs')).toBe(
      true,
    );
  });

  it('hides out-of-stock products when availability is in stock', () => {
    const stocked = filterCatalog(
      filters({
        categoryId: 'lighting',
        subcategoryId: 'bulbs',
        availability: 'in-stock',
      }),
    );

    expect(stocked.map((product) => product.id)).toEqual([
      'warm-white-bulb',
      'cool-white-bulb',
    ]);
  });

  it('filters by brand and search text', () => {
    expect(
      filterCatalog(filters({ categoryId: 'lighting', brand: 'Northwire' })),
    ).toEqual([]);
    expect(
      filterCatalog(filters({ query: 'conduit' })).map((product) => product.id),
    ).toEqual(['pvc-conduit']);
    expect(filterCatalog(filters({ query: 'lantern' }))).toEqual([]);
  });

  it('reorders products when the sort changes', () => {
    const byPrice = filterCatalog(filters({ sort: 'price-asc' }));
    const byName = filterCatalog(filters({ sort: 'name' }));

    expect(byPrice[0]?.id).toBe('pvc-conduit');
    expect(byPrice.map((product) => product.amount)).toEqual(
      [...byPrice.map((product) => product.amount)].sort(
        (left, right) => left - right,
      ),
    );
    expect(byName[0]?.name).toBe('Candle bulb');
    expect(byName.map((product) => product.name)).not.toEqual(
      filterCatalog(filters()).map((product) => product.name),
    );
  });

  it('describes the active filters in the result summary', () => {
    expect(
      describeCatalogResults(
        2,
        filters({
          categoryId: 'lighting',
          subcategoryId: 'bulbs',
          availability: 'in-stock',
          sort: 'price-asc',
        }),
      ),
    ).toBe('2 products · Lighting · Bulbs · In stock · Low to high');
  });
});
