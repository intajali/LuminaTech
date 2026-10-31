import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { lightColor } from '@/design-system/color';
import { Button } from '@/design-system/components/button';
import { ScreenContainer } from '@/design-system/components/screen';
import { TextField } from '@/design-system/components/text-field';
import { stackScreenEdges } from '@/design-system/layout';
import { typography } from '@/design-system/typography';
import { goBack } from '@/navigation/go-back';

export default function LoginScreen() {
  const [code, setCode] = useState('');

  return (
    <ScreenContainer edges={stackScreenEdges}>
      <Stack.Screen options={{ title: 'Sign in' }} />
      <Text accessibilityRole="header" style={styles.title}>
        Sign in
      </Text>
      <Text style={styles.body}>Enter the code we send to your phone.</Text>
      <TextField
        label="One-time code"
        onChangeText={setCode}
        placeholder="6-digit code"
        value={code}
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
