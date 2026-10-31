import { router } from 'expo-router';

import { ScreenContainer } from '@/design-system/components/screen';
import { EmptyState } from '@/design-system/components/status-state';
import { tabScreenEdges } from '@/design-system/layout';

export default function CartScreen() {
  return (
    <ScreenContainer edges={tabScreenEdges}>
      <EmptyState
        actionLabel="Checkout"
        message="Products you add will wait here."
        onAction={() => router.push('/checkout')}
        title="Your cart is empty"
      />
    </ScreenContainer>
  );
}
