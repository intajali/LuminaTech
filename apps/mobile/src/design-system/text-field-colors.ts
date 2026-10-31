import { lightColor } from './color';

export type TextFieldInteraction = 'default' | 'focused' | 'error' | 'disabled';

export type TextFieldColors = {
  backgroundColor: string;
  borderColor: string;
  labelColor: string;
  inputColor: string;
  placeholderColor: string;
  messageColor: string;
};

const textFieldPalette = {
  default: {
    backgroundColor: lightColor.surface,
    borderColor: lightColor.border,
    labelColor: lightColor.text,
    inputColor: lightColor.text,
    placeholderColor: lightColor.placeholder,
    messageColor: lightColor.textSecondary,
  },
  focused: {
    backgroundColor: lightColor.surface,
    borderColor: lightColor.focus,
    labelColor: lightColor.text,
    inputColor: lightColor.text,
    placeholderColor: lightColor.placeholder,
    messageColor: lightColor.textSecondary,
  },
  error: {
    backgroundColor: lightColor.surface,
    borderColor: lightColor.error,
    labelColor: lightColor.error,
    inputColor: lightColor.text,
    placeholderColor: lightColor.placeholder,
    messageColor: lightColor.error,
  },
  disabled: {
    backgroundColor: lightColor.disabledBackground,
    borderColor: lightColor.disabledText,
    labelColor: lightColor.disabledText,
    inputColor: lightColor.disabledText,
    placeholderColor: lightColor.disabledText,
    messageColor: lightColor.disabledText,
  },
} as const satisfies Record<TextFieldInteraction, TextFieldColors>;

export function textFieldColors(
  interaction: TextFieldInteraction,
): TextFieldColors {
  return textFieldPalette[interaction];
}
