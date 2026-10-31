import { StyleSheet, Text } from 'react-native';

import { lightColor } from '../color';
import { formatPrice } from '../price';
import { typography } from '../typography';

type PriceDisplayProps = {
  amount: number;
  currency: string;
};

export function PriceDisplay({ amount, currency }: PriceDisplayProps) {
  return <Text style={styles.price}>{formatPrice({ amount, currency })}</Text>;
}

const styles = StyleSheet.create({
  price: {
    ...typography.label,
    color: lightColor.primary,
  },
});
