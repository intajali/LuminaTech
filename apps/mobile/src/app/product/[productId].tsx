import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { lightColor } from '@/design-system/color';
import { Button } from '@/design-system/components/button';
import { ScreenContainer } from '@/design-system/components/screen';
import { stackScreenEdges } from '@/design-system/layout';
import { typography } from '@/design-system/typography';
import { goBack } from '@/navigation/go-back';
import { singleRouteParam } from '@/navigation/routes';

export default function ProductScreen() {
  const params = useLocalSearchParams<{ productId: string }>();
  const productId = singleRouteParam(params.productId);

  return (
    <ScreenContainer edges={stackScreenEdges}>
      <Stack.Screen options={{ title: 'Product' }} />
      <Text accessibilityRole="header" style={styles.title}>
        Product
      </Text>
      <Text style={styles.body}>
        {productId ? `Product ${productId}` : 'This product is unavailable.'}
      </Text>
      <Button label="Back" onPress={goBack} variant="secondary" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.heading,
    color: lightColor.text,
  },
  body: {
    ...typography.body,
    color: lightColor.textSecondary,
  },
});
