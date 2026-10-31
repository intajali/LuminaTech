import {
  Pressable,
  StyleSheet,
  Text,
  type PressableStateCallbackType,
} from 'react-native';

import {
  buttonColors,
  type ButtonInteraction,
  type ButtonVariant,
} from '../button-colors';
import { touchTarget } from '../layout';
import { radius } from '../radius';
import { spacing } from '../spacing';
import { typography } from '../typography';

type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onPress?: () => void;
};

export function Button({
  label,
  variant = 'primary',
  disabled = false,
  onPress,
}: ButtonProps) {
  const interactionFor = (pressed: boolean): ButtonInteraction => {
    if (disabled) {
      return 'disabled';
    }
    return pressed ? 'pressed' : 'enabled';
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={(state: PressableStateCallbackType) => {
        const colors = buttonColors(variant, interactionFor(state.pressed));
        return [
          styles.pressable,
          {
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
          },
        ];
      }}
    >
      {(state: PressableStateCallbackType) => {
        const colors = buttonColors(variant, interactionFor(state.pressed));
        return (
          <Text style={[styles.label, { color: colors.labelColor }]}>
            {label}
          </Text>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    borderRadius: radius.large,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: touchTarget.control,
    paddingHorizontal: spacing[16],
  },
  label: {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    letterSpacing: typography.label.letterSpacing,
    lineHeight: typography.label.lineHeight,
  },
});
