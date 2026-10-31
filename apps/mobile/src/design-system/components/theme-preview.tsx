import { router } from 'expo-router';
import { type ReactNode, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { APP_NAME } from '@luminatech/contracts';

import { lightColor } from '../color';
import { radius } from '../radius';
import { shadow } from '../shadow';
import { shadowStyle } from '../shadow-style';
import { spacing } from '../spacing';
import { typography } from '../typography';

import { Button } from './button';
import { CategoryCard } from './category-card';
import { PriceDisplay } from './price-display';
import { ProductCard } from './product-card';
import { QuantityStepper } from './quantity-stepper';
import { ScreenContainer } from './screen';
import { SearchBar } from './search-bar';
import { EmptyState, ErrorState, LoadingState } from './status-state';
import { TextField } from './text-field';

const swatches = [
  { name: 'Screen', hex: lightColor.screenBackground },
  { name: 'Surface', hex: lightColor.surface },
  { name: 'Ink', hex: lightColor.text },
  { name: 'Secondary', hex: lightColor.textSecondary },
  { name: 'Brand blue', hex: lightColor.focus },
  { name: 'Primary', hex: lightColor.primary },
  { name: 'Mist', hex: lightColor.secondary },
  { name: 'Error', hex: lightColor.error },
] as const;

export function ThemePreview() {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(1);

  return (
    <ScreenContainer scroll>
      <Button
        label="Welcome"
        onPress={() => router.push('/')}
        variant="ghost"
      />
      <Text accessibilityRole="header" style={styles.display}>
        {APP_NAME}
      </Text>
      <Text style={styles.caption}>Light theme</Text>

      <PreviewSection title="Color">
        <View style={styles.swatchRow}>
          {swatches.map((swatch) => (
            <View key={swatch.name} style={styles.swatch}>
              <View
                style={[
                  styles.swatchFill,
                  {
                    backgroundColor: swatch.hex,
                    borderColor: lightColor.border,
                  },
                ]}
              />
              <Text style={styles.label}>{swatch.name}</Text>
              <Text style={styles.caption}>{swatch.hex}</Text>
            </View>
          ))}
        </View>
      </PreviewSection>

      <PreviewSection title="Typography">
        <Text style={styles.display}>Display</Text>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.heading}>Heading</Text>
        <Text style={styles.body}>
          Body copy stays readable on the screen background.
        </Text>
        <Text style={styles.label}>Label</Text>
        <Text style={styles.caption}>Caption for supporting detail.</Text>
      </PreviewSection>

      <PreviewSection title="Spacing">
        {([8, 16, 24, 32, 48] as const).map((size) => (
          <View key={size} style={styles.spacingRow}>
            <View
              style={[
                styles.spacingBar,
                { backgroundColor: lightColor.primary, width: spacing[size] },
              ]}
            />
            <Text style={styles.caption}>{size}</Text>
          </View>
        ))}
      </PreviewSection>

      <PreviewSection title="Radius">
        <View style={styles.radiusRow}>
          {(
            [
              ['small', radius.small],
              ['medium', radius.medium],
              ['large', radius.large],
              ['pill', radius.pill],
            ] as const
          ).map(([radiusName, value]) => (
            <View key={radiusName} style={styles.radiusItem}>
              <View
                style={[
                  styles.radiusShape,
                  { borderRadius: value, borderColor: lightColor.primary },
                ]}
              />
              <Text style={styles.caption}>{radiusName}</Text>
            </View>
          ))}
        </View>
      </PreviewSection>

      <PreviewSection title="Shadow">
        <View style={styles.shadowRow}>
          <View style={[styles.shadowCard, shadowStyle(shadow.raised)]}>
            <Text style={styles.label}>Raised</Text>
          </View>
          <View style={[styles.shadowCard, shadowStyle(shadow.overlay)]}>
            <Text style={styles.label}>Overlay</Text>
          </View>
        </View>
      </PreviewSection>

      <PreviewSection title="Buttons">
        <Button label="Primary" onPress={() => undefined} />
        <Button
          label="Secondary"
          onPress={() => undefined}
          variant="secondary"
        />
        <Button label="Ghost" onPress={() => undefined} variant="ghost" />
        <Button disabled label="Disabled" />
      </PreviewSection>

      <PreviewSection title="Inputs">
        <TextField
          label="Name"
          onChangeText={setName}
          placeholder="Start typing"
          value={name}
        />
        <TextField
          errorMessage="Enter a name to continue."
          label="Name with error"
          value=""
        />
        <TextField
          disabled
          label="Disabled"
          placeholder="Unavailable"
          value=""
        />
      </PreviewSection>

      <PreviewSection title="Search">
        <SearchBar
          onChangeText={setQuery}
          placeholder="Search products"
          value={query}
        />
      </PreviewSection>

      <PreviewSection title="Catalog">
        <ProductCard
          amount={1299}
          currency="USD"
          detail="E27 · 9 W"
          name="Warm white bulb"
          onPress={() => undefined}
        />
        <CategoryCard
          detail="Wall and dimmer"
          name="Switches"
          onPress={() => undefined}
        />
        <PriceDisplay amount={1299} currency="USD" />
        <QuantityStepper onChange={setQuantity} value={quantity} />
      </PreviewSection>

      <PreviewSection title="Status">
        <LoadingState />
        <EmptyState
          message="Products you add will show up here."
          title="No products yet"
        />
        <ErrorState
          message="The product list could not be loaded."
          onRetry={() => undefined}
        />
      </PreviewSection>
    </ScreenContainer>
  );
}

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    ...typography.display,
    color: lightColor.text,
  },
  title: {
    ...typography.title,
    color: lightColor.text,
  },
  heading: {
    ...typography.heading,
    color: lightColor.text,
  },
  body: {
    ...typography.body,
    color: lightColor.text,
  },
  label: {
    ...typography.label,
    color: lightColor.text,
  },
  caption: {
    ...typography.caption,
    color: lightColor.textSecondary,
  },
  section: {
    gap: spacing[12],
    width: '100%',
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[12],
  },
  swatch: {
    gap: spacing[4],
    width: 104,
  },
  swatchFill: {
    borderRadius: radius.medium,
    borderWidth: 1,
    height: 56,
  },
  spacingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[12],
  },
  spacingBar: {
    height: spacing[8],
  },
  radiusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[16],
  },
  radiusItem: {
    alignItems: 'center',
    gap: spacing[8],
  },
  radiusShape: {
    backgroundColor: lightColor.secondary,
    borderWidth: 2,
    height: 56,
    width: 56,
  },
  shadowRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[16],
  },
  shadowCard: {
    backgroundColor: lightColor.surface,
    borderRadius: radius.large,
    padding: spacing[16],
    width: 140,
  },
});
