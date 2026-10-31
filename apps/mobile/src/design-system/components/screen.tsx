import { type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { lightColor } from '../color';
import { safeAreaEdges } from '../layout';
import { spacing } from '../spacing';
import { useResponsiveLayout } from '../use-responsive-layout';

type ScreenEdge = (typeof safeAreaEdges)[number];

type ScreenContainerProps = {
  children: ReactNode;
  scroll?: boolean;
  edges?: readonly ScreenEdge[];
};

export function ScreenContainer({
  children,
  scroll = false,
  edges = safeAreaEdges,
}: ScreenContainerProps) {
  const layout = useResponsiveLayout();
  const column = {
    alignSelf: 'center' as const,
    gap: spacing[16],
    maxWidth: layout.contentMaxWidth,
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing[24],
    width: '100%' as const,
  };

  return (
    <SafeAreaView
      edges={[...edges]}
      style={{ flex: 1, backgroundColor: lightColor.screenBackground }}
    >
      {scroll ? (
        <ScrollView
          contentContainerStyle={column}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, column]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
