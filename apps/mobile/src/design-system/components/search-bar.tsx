import { Pressable, StyleSheet, Text } from 'react-native';

import { lightColor } from '../color';
import { touchTarget } from '../layout';
import { spacing } from '../spacing';
import { typography } from '../typography';

import { TextField } from './text-field';

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  label?: string;
};

export function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Search',
  label = 'Search',
}: SearchBarProps) {
  return (
    <TextField
      accessibilityRole="search"
      label={label}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmit ? () => onSubmit(value) : undefined}
      placeholder={placeholder}
      returnKeyType="search"
      trailing={
        value.length > 0 ? (
          <Pressable
            accessibilityLabel={`Clear ${label}`}
            accessibilityRole="button"
            onPress={() => onChangeText('')}
            style={styles.clear}
          >
            <Text style={styles.clearLabel}>Clear</Text>
          </Pressable>
        ) : null
      }
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  clear: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: touchTarget.minimum,
    minWidth: touchTarget.minimum,
    paddingHorizontal: spacing[8],
  },
  clearLabel: {
    ...typography.label,
    color: lightColor.primary,
  },
});
