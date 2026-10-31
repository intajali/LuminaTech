import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { breakpoint, contentMaxWidth, screenPaddingForWidth } from './layout';

export function useResponsiveLayout() {
  const { width } = useWindowDimensions();
  const [hasMeasuredWindow, setHasMeasuredWindow] = useState(false);

  useEffect(() => {
    // The server does not know the browser width. Measure after hydration
    // so the first client render matches the server markup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMeasuredWindow(true);
  }, []);

  const windowWidth = hasMeasuredWindow ? width : 0;

  return {
    windowWidth,
    contentMaxWidth,
    screenPadding: screenPaddingForWidth(windowWidth),
    isCompact: windowWidth < breakpoint.regular,
  };
}
