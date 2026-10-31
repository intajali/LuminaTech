import { StatusBar } from 'expo-status-bar';

import { ThemePreview } from '@/design-system/components/theme-preview';

export default function ThemePreviewScreen() {
  return (
    <>
      <StatusBar style="dark" />
      <ThemePreview />
    </>
  );
}
