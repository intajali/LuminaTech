import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableStateCallbackType,
} from 'react-native';

import { lightColor } from '../color';
import { touchTarget } from '../layout';
import { stepQuantity, type QuantityDirection } from '../quantity';
import { radius } from '../radius';
import { spacing } from '../spacing';
import { typography } from '../typography';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = 'Quantity',
}: QuantityStepperProps) {
  const change = (direction: QuantityDirection) => {
    onChange(stepQuantity(value, direction, min, max));
  };

  return (
    <View style={styles.stepper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.controls}>
        <StepButton
          disabled={value <= min}
          label={`Decrease ${label}`}
          onPress={() => change(-1)}
          symbol="−"
        />
        <Text accessibilityLabel={`${label} ${value}`} style={styles.value}>
          {value}
        </Text>
        <StepButton
          disabled={value >= max}
          label={`Increase ${label}`}
          onPress={() => change(1)}
          symbol="+"
        />
      </View>
    </View>
  );
}

function StepButton({
  label,
  symbol,
  disabled,
  onPress,
}: {
  label: string;
  symbol: string;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={(state: PressableStateCallbackType) => [
        styles.step,
        {
          backgroundColor: disabled
            ? lightColor.disabledBackground
            : state.pressed
              ? lightColor.secondaryPressed
              : lightColor.surface,
          borderColor: disabled ? lightColor.disabledText : lightColor.border,
        },
      ]}
    >
      <Text
        style={[
          styles.symbol,
          { color: disabled ? lightColor.disabledText : lightColor.text },
        ]}
      >
        {symbol}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  stepper: {
    gap: spacing[8],
  },
  label: {
    ...typography.label,
    color: lightColor.text,
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[12],
  },
  step: {
    alignItems: 'center',
    borderRadius: radius.medium,
    borderWidth: 1,
    height: touchTarget.control,
    justifyContent: 'center',
    width: touchTarget.control,
  },
  symbol: {
    ...typography.heading,
  },
  value: {
    ...typography.body,
    color: lightColor.text,
    minWidth: spacing[32],
    textAlign: 'center',
  },
});
