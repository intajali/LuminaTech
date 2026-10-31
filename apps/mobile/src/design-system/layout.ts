import { spacing } from './spacing';

/**
 * Screen convention:
 * Paint the full window with the screen background, including the safe area.
 * Keep every edge inside the safe area, then add screen padding.
 * Center a column and cap it at the content width on wider windows.
 */
export const breakpoint = {
  regular: 600,
  wide: 1024,
} as const;

export const contentMaxWidth = 720;

export const screenPadding = {
  compact: spacing[16],
  regular: spacing[24],
} as const;

export const safeAreaEdges = ['top', 'right', 'bottom', 'left'] as const;

/**
 * Tab screens keep the top inset for the status bar and notch.
 * The tab bar owns the bottom inset on iOS and Android.
 */
export const tabScreenEdges = ['top', 'left', 'right'] as const;

/**
 * Stack screens with a header let that header own the top inset.
 * The bottom inset stays so content clears the home indicator and Android navigation bar.
 */
export const stackScreenEdges = ['left', 'right', 'bottom'] as const;

export const touchTarget = {
  minimum: 44,
  control: 48,
} as const;

export function screenPaddingForWidth(windowWidth: number): number {
  return windowWidth >= breakpoint.regular
    ? screenPadding.regular
    : screenPadding.compact;
}
