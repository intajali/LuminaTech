/** LuminaTech brand colors. Blue is the accent; it is not used for small text. */
export const brandColor = {
  blue: '#208AEF',
  mist: '#E6F4FE',
  ink: '#07203A',
  white: '#FFFFFF',
} as const;

/**
 * Light theme semantic colors.
 * Text pairs meet WCAG AA 4.5:1. Control boundaries meet 3:1.
 * Primary is darker than brand blue so white button labels stay readable.
 */
export const lightColor = {
  screenBackground: '#F7FBFE',
  surface: '#FFFFFF',
  text: brandColor.ink,
  textSecondary: '#3D4F66',
  primary: '#0B5CAD',
  primaryPressed: '#084E92',
  onPrimary: brandColor.white,
  secondary: brandColor.mist,
  secondaryPressed: '#D3EAFB',
  onSecondary: brandColor.ink,
  border: '#7A90A8',
  focus: brandColor.blue,
  error: '#B42318',
  disabledBackground: '#E7EEF5',
  disabledText: '#4A5D75',
  placeholder: '#5E738C',
} as const;
