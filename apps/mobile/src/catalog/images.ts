import { type ImageSourcePropType } from 'react-native';

import { type CatalogImageKey } from './home-catalog';

/**
 * Catalog art is bundled in assets/catalog.
 * These files are geometric placeholders, not photographs and not remote URLs.
 * Replace a PNG and keep its file name when product photography is ready.
 * Catalog screens read only this map.
 */
export const catalogImages = {
  'banner-trade': require('../../assets/catalog/banner-trade.png'),
  bulb: require('../../assets/catalog/bulb.png'),
  dimmer: require('../../assets/catalog/dimmer.png'),
  panel: require('../../assets/catalog/panel.png'),
  cable: require('../../assets/catalog/cable.png'),
  breaker: require('../../assets/catalog/breaker.png'),
  socket: require('../../assets/catalog/socket.png'),
  lighting: require('../../assets/catalog/lighting.png'),
  switches: require('../../assets/catalog/switches.png'),
  'cable-category': require('../../assets/catalog/cable-category.png'),
  protection: require('../../assets/catalog/protection.png'),
} as const satisfies Record<CatalogImageKey, ImageSourcePropType>;
