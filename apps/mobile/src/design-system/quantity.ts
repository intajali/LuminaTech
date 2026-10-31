export type QuantityDirection = -1 | 1;

export function stepQuantity(
  value: number,
  direction: QuantityDirection,
  min: number,
  max: number,
): number {
  if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) {
    throw new Error('Quantity bounds are invalid');
  }
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error('Quantity is outside the allowed range');
  }

  const next = value + direction;
  if (next < min || next > max) {
    return value;
  }
  return next;
}
