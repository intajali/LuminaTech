import { Platform, type ViewStyle } from 'react-native';

import { type ShadowToken } from './shadow';

export function shadowStyle(token: ShadowToken): ViewStyle {
  const boxShadow = `0px ${token.offsetY}px ${token.blur}px rgba(7, 32, 58, ${token.opacity})`;

  return (
    Platform.select({
      web: { boxShadow },
      android: { elevation: token.elevation },
      default: {
        shadowColor: token.color,
        shadowOffset: { width: token.offsetX, height: token.offsetY },
        shadowOpacity: token.opacity,
        shadowRadius: token.blur,
      },
    }) ?? {}
  );
}
