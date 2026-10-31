import { describe, expect, it } from 'vitest';

import {
  assertLocalCatalog,
  catalogImageKeys,
  homeCatalog,
} from './home-catalog';

describe('homeCatalog', () => {
  it('stays on bundled placeholders instead of a product API', () => {
    expect(() => assertLocalCatalog()).not.toThrow();
    expect(homeCatalog.categories.map((category) => category.name)).toEqual([
      'Lighting',
      'Switches',
      'Cable',
      'Protection',
    ]);
    expect(homeCatalog.featured.map((product) => product.id)).toContain(
      'warm-white-bulb',
    );
    expect(homeCatalog.popularElectrical.length).toBeGreaterThan(0);
    expect(homeCatalog.recentlyViewed.length).toBeGreaterThan(0);
    expect(catalogImageKeys).toContain(homeCatalog.banner.image);
  });
});
