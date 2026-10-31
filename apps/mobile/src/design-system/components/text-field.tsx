import { type ReactNode, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { touchTarget } from '../layout';
import { radius } from '../radius';
import { spacing } from '../spacing';
import {
  textFieldColors,
  type TextFieldInteraction,
} from '../text-field-colors';
import { typography } from '../typography';

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  returnKeyType?: TextInputProps['returnKeyType'];
  accessibilityRole?: TextInputProps['accessibilityRole'];
  trailing?: ReactNode;
};

export function TextField({
  label,
  value,
  onChangeText,
  onSubmitEditing,
  placeholder,
  errorMessage,
  disabled = false,
  returnKeyType,
  accessibilityRole,
  trailing,
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // React Native Web serializes input attributes differently on the server.
    // Mount the native field after hydration so those attributes are not compared.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHydrated(true);
  }, []);
  const interaction: TextFieldInteraction = disabled
    ? 'disabled'
    : errorMessage
      ? 'error'
      : focused
        ? 'focused'
        : 'default';
  const colors = textFieldColors(interaction);
  const inputStyle = {
    backgroundColor: colors.backgroundColor,
    borderColor: colors.borderColor,
  };

  return (
    <View accessibilityRole={accessibilityRole} style={styles.field}>
      <Text style={[typography.label, { color: colors.labelColor }]}>
        {label}
      </Text>
      <View style={[styles.inputRow, inputStyle]}>
        {hasHydrated ? (
          <TextInput
            accessibilityHint={errorMessage}
            accessibilityLabel={label}
            accessibilityState={{ disabled }}
            editable={!disabled}
            onBlur={() => setFocused(false)}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor={colors.placeholderColor}
            returnKeyType={returnKeyType}
            style={[
              typography.body,
              styles.input,
              { color: colors.inputColor },
            ]}
            value={value}
          />
        ) : (
          <View
            accessibilityLabel={label}
            style={[styles.input, styles.inputPreview]}
          >
            <Text
              style={[
                typography.body,
                {
                  color: value ? colors.inputColor : colors.placeholderColor,
                },
              ]}
            >
              {value || placeholder || ' '}
            </Text>
          </View>
        )}
        {trailing}
      </View>
      {errorMessage ? (
        <Text
          accessibilityRole="alert"
          style={[typography.caption, { color: colors.messageColor }]}
        >
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing[8],
    width: '100%',
  },
  inputRow: {
    alignItems: 'center',
    borderRadius: radius.medium,
    borderWidth: 2,
    flexDirection: 'row',
    minHeight: touchTarget.control,
  },
  input: {
    flex: 1,
    minHeight: touchTarget.control,
    paddingHorizontal: spacing[16],
  },
  inputPreview: {
    justifyContent: 'center',
  },
});
