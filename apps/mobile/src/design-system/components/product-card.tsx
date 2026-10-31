import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type PressableStateCallbackType,
} from 'react-native';

import { lightColor } from '../color';
import { touchTarget } from '../layout';
import { formatPrice } from '../price';
import { radius } from '../radius';
import { shadow } from '../shadow';
import { shadowStyle } from '../shadow-style';
import { spacing } from '../spacing';
import { typography } from '../typography';

import { PriceDisplay } from './price-display';

type ProductCardProps = {
  name: string;
  amount: number;
  currency: string;
  detail?: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
};

export function ProductCard({
  name,
  amount,
  currency,
  detail,
  image,
  onPress,
}: ProductCardProps) {
  const priceLabel = formatPrice({ amount, currency });
  const accessibilityLabel = detail
    ? `${name}, ${detail}, ${priceLabel}`
    : `${name}, ${priceLabel}`;

  const content = (
    <>
      {image ? (
        <Image accessible={false} source={image} style={styles.image} />
      ) : null}
      <View style={styles.copy}>
        <Text style={styles.name}>{name}</Text>
        {detail ? <Text style={styles.detail}>{detail}</Text> : null}
      </View>
      <PriceDisplay amount={amount} currency={currency} />
    </>
  );

  if (!onPress) {
    return (
      <View accessibilityLabel={accessibilityLabel} style={styles.card}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={(state: PressableStateCallbackType) => [
        styles.card,
        state.pressed ? styles.pressed : null,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadowStyle(shadow.raised),
    alignItems: 'center',
    backgroundColor: lightColor.surface,
    borderColor: lightColor.border,
    borderRadius: radius.large,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing[16],
    minHeight: touchTarget.control,
    padding: spacing[16],
    width: '100%',
  },
  pressed: {
    backgroundColor: lightColor.secondaryPressed,
  },
  image: {
    backgroundColor: lightColor.secondary,
    borderRadius: radius.medium,
    height: 56,
    width: 56,
  },
  copy: {
    flex: 1,
    gap: spacing[4],
  },
  name: {
    ...typography.label,
    color: lightColor.text,
  },
  detail: {
    ...typography.caption,
    color: lightColor.textSecondary,
  },
});
