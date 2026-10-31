import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { lightColor } from '@/design-system/color';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => undefined);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: lightColor.screenBackground },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: lightColor.surface },
          headerTintColor: lightColor.primary,
          headerTitleStyle: { color: lightColor.text },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: 'Home' }}
        />
        <Stack.Screen name="theme-preview" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
