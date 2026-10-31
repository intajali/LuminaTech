const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

function linearChannel(hex: string, channelIndex: number): number {
  const start = 1 + channelIndex * 2;
  const value = Number.parseInt(hex.slice(start, start + 2), 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance for a #RRGGBB color, from WCAG 2. */
export function relativeLuminance(hex: string): number {
  if (!HEX_COLOR.test(hex)) {
    throw new Error(`Expected a #RRGGBB color, received ${hex}`);
  }

  return (
    0.2126 * linearChannel(hex, 0) +
    0.7152 * linearChannel(hex, 1) +
    0.0722 * linearChannel(hex, 2)
  );
}

/** WCAG contrast ratio. 4.5 is AA for normal text. 3 is AA for large text and UI boundaries. */
export function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}
