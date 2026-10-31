import { Stack, router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { lightColor } from '@/design-system/color';
import { Button } from '@/design-system/components/button';
import { ScreenContainer } from '@/design-system/components/screen';
import { stackScreenEdges } from '@/design-system/layout';
import { typography } from '@/design-system/typography';
import { goBack } from '@/navigation/go-back';
import { sampleOrderId } from '@/navigation/routes';

export default function CheckoutScreen() {
  return (
    <ScreenContainer edges={stackScreenEdges}>
      <Stack.Screen options={{ title: 'Checkout' }} />
      <Text accessibilityRole="header" style={styles.title}>
        Checkout
      </Text>
      <Text style={styles.body}>Payment is not connected yet.</Text>
      <Button
        label="Place order"
        onPress={() =>
          router.push({
            pathname: '/order/[orderId]',
            params: { orderId: sampleOrderId },
          })
        }
      />
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
