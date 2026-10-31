import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  type AccessibilityRole,
} from 'react-native';

import { lightColor } from '../color';
import { spacing } from '../spacing';
import { typography } from '../typography';

import { Button } from './button';

type StatusCopy = {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function LoadingState({ label = 'Loading' }: { label?: string }) {
  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true }}
      style={styles.status}
    >
      <ActivityIndicator color={lightColor.primary} />
      <Text style={styles.loadingLabel}>{label}</Text>
    </View>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <StatusCopyView
      accessibilityRole="alert"
      actionLabel={onRetry ? 'Try again' : undefined}
      message={message}
      onAction={onRetry}
      title={title}
    />
  );
}

export function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}: StatusCopy) {
  return (
    <StatusCopyView
      actionLabel={actionLabel}
      message={message}
      onAction={onAction}
      title={title}
    />
  );
}

function StatusCopyView({
  title,
  message,
  actionLabel,
  onAction,
  accessibilityRole,
}: StatusCopy & { accessibilityRole?: AccessibilityRole }) {
  return (
    <View accessibilityRole={accessibilityRole} style={styles.status}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel && onAction ? (
        <View style={styles.action}>
          <Button label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    alignItems: 'center',
    gap: spacing[12],
    width: '100%',
  },
  title: {
    ...typography.heading,
    color: lightColor.text,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    color: lightColor.textSecondary,
    textAlign: 'center',
  },
  loadingLabel: {
    ...typography.body,
    color: lightColor.text,
    textAlign: 'center',
  },
  action: {
    alignSelf: 'stretch',
  },
});
