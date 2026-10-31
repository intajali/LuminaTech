import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableStateCallbackType,
} from 'react-native';

import { lightColor } from '../color';
import { touchTarget } from '../layout';
import { radius } from '../radius';
import { spacing } from '../spacing';
import { typography } from '../typography';

type CategoryCardProps = {
  name: string;
  detail?: string;
  onPress?: () => void;
};

export function CategoryCard({ name, detail, onPress }: CategoryCardProps) {
  const accessibilityLabel = detail ? `${name}, ${detail}` : name;
  const content = (
    <>
      <Text style={styles.name}>{name}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
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
    backgroundColor: lightColor.secondary,
    borderColor: lightColor.primary,
    borderRadius: radius.large,
    borderWidth: 1,
    gap: spacing[4],
    justifyContent: 'center',
    minHeight: touchTarget.control,
    padding: spacing[16],
    width: '100%',
  },
  pressed: {
    backgroundColor: lightColor.secondaryPressed,
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
