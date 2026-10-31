import { brandColor, lightColor } from './color';
import {
  breakpoint,
  contentMaxWidth,
  safeAreaEdges,
  screenPadding,
  touchTarget,
} from './layout';
import { radius } from './radius';
import { shadow } from './shadow';
import { spacing } from './spacing';
import { typography } from './typography';

export const lightTheme = {
  color: {
    brand: brandColor,
    ...lightColor,
  },
  spacing,
  typography,
  radius,
  shadow,
  layout: {
    breakpoint,
    contentMaxWidth,
    screenPadding,
    safeAreaEdges,
    touchTarget,
  },
} as const;
