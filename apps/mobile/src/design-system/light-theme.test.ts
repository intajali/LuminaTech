import { describe, expect, it } from 'vitest';

import {
  buttonColors,
  buttonLabelBackground,
  type ButtonInteraction,
  type ButtonVariant,
} from './button-colors';
import { brandColor, lightColor } from './color';
import { contrastRatio } from './contrast';
import {
  contentMaxWidth,
  screenPadding,
  screenPaddingForWidth,
  touchTarget,
} from './layout';
import { radius } from './radius';
import { shadow } from './shadow';
import { spacing } from './spacing';
import {
  textFieldColors,
  type TextFieldInteraction,
} from './text-field-colors';
import { typography } from './typography';

const BODY_TEXT_CONTRAST = 4.5;
const UI_CONTRAST = 3;

describe('contrastRatio', () => {
  it('matches the black and white WCAG ratio', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
  });

  it('rejects colors that are not #RRGGBB', () => {
    expect(() => contrastRatio('#fff', '#000000')).toThrow(
      'Expected a #RRGGBB color',
    );
  });
});

describe('light theme text contrast', () => {
  it('keeps body text readable on the screen and on surfaces', () => {
    expect(
      contrastRatio(lightColor.text, lightColor.screenBackground),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.text, lightColor.surface),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.textSecondary, lightColor.screenBackground),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.error, lightColor.screenBackground),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
  });

  it('does not use brand blue for small text on white', () => {
    expect(contrastRatio(brandColor.white, brandColor.blue)).toBeLessThan(
      BODY_TEXT_CONTRAST,
    );
    expect(
      contrastRatio(lightColor.onPrimary, lightColor.primary),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
  });
});

describe('button colors', () => {
  const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost'];
  const interactions: ButtonInteraction[] = ['enabled', 'pressed', 'disabled'];

  it('keeps every label at AA contrast', () => {
    for (const variant of variants) {
      for (const interaction of interactions) {
        const colors = buttonColors(variant, interaction);
        expect(
          contrastRatio(colors.labelColor, buttonLabelBackground(colors)),
        ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
      }
    }
  });

  it('keeps visible borders distinct from the fill', () => {
    for (const variant of variants) {
      for (const interaction of interactions) {
        const colors = buttonColors(variant, interaction);
        if (
          colors.borderColor === 'transparent' ||
          colors.borderColor === colors.backgroundColor
        ) {
          continue;
        }
        expect(
          contrastRatio(colors.borderColor, colors.backgroundColor),
        ).toBeGreaterThanOrEqual(UI_CONTRAST);
      }
    }
  });

  it('keeps the primary fill distinct from the screen', () => {
    expect(
      contrastRatio(
        buttonColors('primary', 'enabled').backgroundColor,
        lightColor.screenBackground,
      ),
    ).toBeGreaterThanOrEqual(UI_CONTRAST);
  });
});

describe('text field colors', () => {
  const interactions: TextFieldInteraction[] = [
    'default',
    'focused',
    'error',
    'disabled',
  ];

  it('keeps labels, input text, and placeholders readable', () => {
    for (const interaction of interactions) {
      const colors = textFieldColors(interaction);
      expect(
        contrastRatio(colors.labelColor, lightColor.screenBackground),
      ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
      expect(
        contrastRatio(colors.inputColor, colors.backgroundColor),
      ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
      expect(
        contrastRatio(colors.placeholderColor, colors.backgroundColor),
      ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
      expect(
        contrastRatio(colors.messageColor, lightColor.screenBackground),
      ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    }
  });

  it('keeps the field boundary visible', () => {
    for (const interaction of interactions) {
      const colors = textFieldColors(interaction);
      expect(
        contrastRatio(colors.borderColor, colors.backgroundColor),
      ).toBeGreaterThanOrEqual(UI_CONTRAST);
    }
  });
});

describe('spacing, radius, shadow, and layout', () => {
  it('uses a 4-point spacing scale', () => {
    expect(Object.values(spacing)).toEqual([0, 4, 8, 12, 16, 24, 32, 48, 64]);
  });

  it('grows radii from square corners to a pill', () => {
    expect(Object.values(radius)).toEqual([0, 4, 8, 12, 16, 999]);
  });

  it('steps shadows from flat to overlay', () => {
    expect(shadow.none.elevation).toBeLessThan(shadow.raised.elevation);
    expect(shadow.raised.elevation).toBeLessThan(shadow.overlay.elevation);
    expect(shadow.none.opacity).toBeLessThan(shadow.raised.opacity);
    expect(shadow.raised.opacity).toBeLessThan(shadow.overlay.opacity);
  });

  it('keeps line height above the font size', () => {
    for (const role of Object.values(typography)) {
      expect(role.lineHeight).toBeGreaterThan(role.fontSize);
    }
  });

  it('pads compact windows less than regular windows and caps the column', () => {
    expect(screenPadding.compact).toBe(spacing[16]);
    expect(screenPadding.regular).toBe(spacing[24]);
    expect(screenPaddingForWidth(390)).toBe(screenPadding.compact);
    expect(screenPaddingForWidth(599)).toBe(screenPadding.compact);
    expect(screenPaddingForWidth(600)).toBe(screenPadding.regular);
    expect(screenPaddingForWidth(1280)).toBe(screenPadding.regular);
    expect(contentMaxWidth).toBe(720);
    expect(touchTarget.control).toBeGreaterThanOrEqual(touchTarget.minimum);
  });
});
