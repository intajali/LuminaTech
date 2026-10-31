import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { lightColor } from '@/design-system/color';
import { Button } from '@/design-system/components/button';
import { ScreenContainer } from '@/design-system/components/screen';
import { tabScreenEdges } from '@/design-system/layout';
import { typography } from '@/design-system/typography';
import { sampleOrderId } from '@/navigation/routes';

export default function AccountScreen() {
  return (
    <ScreenContainer edges={tabScreenEdges}>
      <Text accessibilityRole="header" style={styles.title}>
        Account
      </Text>
      <Text style={styles.body}>Sign in to see orders and saved details.</Text>
      <Button label="Sign in" onPress={() => router.push('/login')} />
      <Button
        label="View sample order"
        onPress={() =>
          router.push({
            pathname: '/order/[orderId]',
            params: { orderId: sampleOrderId },
          })
        }
        variant="secondary"
      />
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
