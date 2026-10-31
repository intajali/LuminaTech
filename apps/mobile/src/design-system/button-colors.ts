import { lightColor } from './color';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonInteraction = 'enabled' | 'pressed' | 'disabled';

export type ButtonColors = {
  backgroundColor: string;
  borderColor: string;
  labelColor: string;
};

const buttonPalette = {
  primary: {
    enabled: {
      backgroundColor: lightColor.primary,
      borderColor: lightColor.primary,
      labelColor: lightColor.onPrimary,
    },
    pressed: {
      backgroundColor: lightColor.primaryPressed,
      borderColor: lightColor.primaryPressed,
      labelColor: lightColor.onPrimary,
    },
    disabled: {
      backgroundColor: lightColor.disabledBackground,
      borderColor: lightColor.disabledText,
      labelColor: lightColor.disabledText,
    },
  },
  secondary: {
    enabled: {
      backgroundColor: lightColor.secondary,
      borderColor: lightColor.primary,
      labelColor: lightColor.onSecondary,
    },
    pressed: {
      backgroundColor: lightColor.secondaryPressed,
      borderColor: lightColor.primary,
      labelColor: lightColor.onSecondary,
    },
    disabled: {
      backgroundColor: lightColor.disabledBackground,
      borderColor: lightColor.disabledText,
      labelColor: lightColor.disabledText,
    },
  },
  ghost: {
    enabled: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      labelColor: lightColor.text,
    },
    pressed: {
      backgroundColor: lightColor.secondary,
      borderColor: lightColor.secondary,
      labelColor: lightColor.text,
    },
    disabled: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      labelColor: lightColor.disabledText,
    },
  },
} as const satisfies Record<
  ButtonVariant,
  Record<ButtonInteraction, ButtonColors>
>;

export function buttonColors(
  variant: ButtonVariant,
  interaction: ButtonInteraction,
): ButtonColors {
  return buttonPalette[variant][interaction];
}

/** Color the label is actually painted on. Transparent buttons sit on the screen. */
export function buttonLabelBackground(colors: ButtonColors): string {
  return colors.backgroundColor === 'transparent'
    ? lightColor.screenBackground
    : colors.backgroundColor;
}
