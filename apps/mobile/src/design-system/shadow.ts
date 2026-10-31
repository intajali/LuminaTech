export type ShadowToken = {
  color: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  opacity: number;
  elevation: number;
};

export const shadow = {
  none: {
    color: '#07203A',
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    opacity: 0,
    elevation: 0,
  },
  raised: {
    color: '#07203A',
    offsetX: 0,
    offsetY: 2,
    blur: 8,
    opacity: 0.08,
    elevation: 2,
  },
  overlay: {
    color: '#07203A',
    offsetX: 0,
    offsetY: 8,
    blur: 24,
    opacity: 0.16,
    elevation: 8,
  },
} as const satisfies Record<string, ShadowToken>;
