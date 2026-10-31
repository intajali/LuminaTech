import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type DimensionValue,
  type PressableStateCallbackType,
} from 'react-native';

import {
  catalogBrands,
  catalogCategories,
  defaultCatalogFilters,
  describeCatalogResults,
  filterCatalog,
  type CatalogAvailability,
  type CatalogBrand,
  type CatalogFilters,
  type CatalogProduct,
  type CatalogSort,
} from '@/catalog/catalog';
import { catalogImages } from '@/catalog/images';
import { lightColor } from '@/design-system/color';
import { PriceDisplay } from '@/design-system/components/price-display';
import { SearchBar } from '@/design-system/components/search-bar';
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from '@/design-system/components/status-state';
import { touchTarget } from '@/design-system/layout';
import { formatPrice } from '@/design-system/price';
import { radius } from '@/design-system/radius';
import { spacing } from '@/design-system/spacing';
import { typography } from '@/design-system/typography';
import { useResponsiveLayout } from '@/design-system/use-responsive-layout';

type PreviewState = 'results' | 'loading' | 'error';

type ProductBrowserProps = {
  showSearch?: boolean;
  query?: string;
  onQueryChange?: (value: string) => void;
  categoryId?: string;
  subcategoryId?: string;
  lockCategory?: boolean;
};

export function ProductBrowser({
  showSearch = false,
  query: controlledQuery,
  onQueryChange,
  categoryId: lockedCategoryId = '',
  subcategoryId: lockedSubcategoryId = '',
  lockCategory = false,
}: ProductBrowserProps) {
  const layout = useResponsiveLayout();
  const [localQuery, setLocalQuery] = useState('');
  const [categoryId, setCategoryId] = useState(lockedCategoryId);
  const [subcategoryId, setSubcategoryId] = useState(lockedSubcategoryId);
  const [brand, setBrand] = useState<CatalogBrand | ''>('');
  const [availability, setAvailability] = useState<CatalogAvailability>('all');
  const [sort, setSort] = useState<CatalogSort>('featured');
  const [preview, setPreview] = useState<PreviewState>('results');
  const query = controlledQuery ?? localQuery;
  const setQuery = onQueryChange ?? setLocalQuery;
  const activeCategoryId = lockCategory ? lockedCategoryId : categoryId;
  const activeSubcategoryId = lockCategory
    ? lockedSubcategoryId
    : subcategoryId;
  const filters: CatalogFilters = {
    ...defaultCatalogFilters,
    query,
    categoryId: activeCategoryId,
    subcategoryId: activeSubcategoryId,
    brand,
    availability,
    sort,
  };
  const products = filterCatalog(filters);
  const columns = layout.isCompact ? 2 : 3;
  const category = catalogCategories.find(
    (item) => item.id === activeCategoryId,
  );

  function clearFilters() {
    setQuery('');
    setBrand('');
    setAvailability('all');
    setSort('featured');
    setPreview('results');
    if (!lockCategory) {
      setCategoryId('');
      setSubcategoryId('');
    }
  }

  let results = (
    <View style={styles.grid}>
      {products.map((product) => (
        <View
          key={product.id}
          style={[styles.cell, { width: cellWidth(columns) }]}
        >
          <ProductTile product={product} />
        </View>
      ))}
    </View>
  );
  if (products.length === 0) {
    results = (
      <EmptyState
        actionLabel="Clear filters"
        message="Try another search or clear the filters."
        onAction={clearFilters}
        title="No matching products"
      />
    );
  }
  if (preview === 'loading') {
    results = <LoadingState label="Loading products" />;
  }
  if (preview === 'error') {
    results = (
      <ErrorState
        message="Local product data is still available."
        onRetry={() => setPreview('results')}
        title="The catalog did not load"
      />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      style={styles.scroll}
    >
      {showSearch ? (
        <SearchBar
          label="Search products"
          onChangeText={setQuery}
          placeholder="Search products"
          value={query}
        />
      ) : null}
      <FilterGroup
        label="Sort"
        onChange={(value) => setSort(value as CatalogSort)}
        options={[
          { value: 'featured', label: 'Featured' },
          { value: 'price-asc', label: 'Low to high' },
          { value: 'price-desc', label: 'High to low' },
          { value: 'name', label: 'Name' },
        ]}
        value={sort}
      />
      <FilterGroup
        label="Brand"
        onChange={(value) => setBrand(value as CatalogBrand | '')}
        options={[
          { value: '', label: 'All' },
          ...catalogBrands.map((item) => ({ value: item, label: item })),
        ]}
        value={brand}
      />
      <FilterGroup
        label="Availability"
        onChange={(value) => setAvailability(value as CatalogAvailability)}
        options={[
          { value: 'all', label: 'All' },
          { value: 'in-stock', label: 'In stock' },
        ]}
        value={availability}
      />
      {lockCategory ? null : (
        <FilterGroup
          label="Category"
          onChange={(value) => {
            setCategoryId(value);
            setSubcategoryId('');
          }}
          options={[
            { value: '', label: 'All' },
            ...catalogCategories.map((item) => ({
              value: item.id,
              label: item.name,
            })),
          ]}
          value={activeCategoryId}
        />
      )}
      {lockCategory || !category ? null : (
        <FilterGroup
          label="Subcategory"
          onChange={setSubcategoryId}
          options={[
            { value: '', label: 'All' },
            ...category.subcategories.map((item) => ({
              value: item.id,
              label: item.name,
            })),
          ]}
          value={activeSubcategoryId}
        />
      )}
      <FilterGroup
        label="Preview"
        onChange={(value) => setPreview(value as PreviewState)}
        options={[
          { value: 'results', label: 'Results' },
          { value: 'loading', label: 'Loading' },
          { value: 'error', label: 'Error' },
        ]}
        value={preview}
      />
      <Text style={styles.summary}>
        {describeCatalogResults(products.length, filters)}
      </Text>
      {results}
    </ScrollView>
  );
}

function ProductTile({ product }: { product: CatalogProduct }) {
  const stockLabel = product.inStock ? '' : 'Out of stock';
  const priceLabel = formatPrice({
    amount: product.amount,
    currency: product.currency,
  });
  const label = [product.name, product.detail, priceLabel, stockLabel]
    .filter((part) => part.length > 0)
    .join(', ');

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={() =>
        router.push({
          pathname: '/product/[productId]',
          params: { productId: product.id },
        })
      }
      style={({ pressed }) => [
        styles.tile,
        pressed ? styles.tilePressed : null,
      ]}
    >
      <Image
        accessible={false}
        source={catalogImages[product.image]}
        style={styles.tileImage}
      />
      <Text style={styles.tileName}>{product.name}</Text>
      <Text style={styles.tileDetail}>{product.detail}</Text>
      <PriceDisplay amount={product.amount} currency={product.currency} />
      {stockLabel ? <Text style={styles.stock}>{stockLabel}</Text> : null}
    </Pressable>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterLabel}>{label}</Text>
      <View style={styles.chips}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              accessibilityLabel={`${label} ${option.label}`}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              aria-selected={selected}
              key={option.value || `${label}-all`}
              onPress={() => onChange(option.value)}
              style={(state: PressableStateCallbackType) => [
                styles.chip,
                selected ? styles.chipSelected : null,
                state.pressed && selected ? styles.chipSelectedPressed : null,
                state.pressed && !selected ? styles.chipPressed : null,
              ]}
            >
              <Text
                style={[
                  styles.chipLabel,
                  selected ? styles.chipLabelSelected : null,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function cellWidth(columns: number): DimensionValue {
  return `${100 / columns}%`;
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
  },
  content: {
    gap: spacing[16],
    paddingBottom: spacing[24],
  },
  filterGroup: {
    gap: spacing[8],
  },
  filterLabel: {
    ...typography.label,
    color: lightColor.text,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[8],
  },
  chip: {
    alignItems: 'center',
    backgroundColor: lightColor.surface,
    borderColor: lightColor.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: touchTarget.minimum,
    paddingHorizontal: spacing[12],
  },
  chipSelected: {
    backgroundColor: lightColor.primary,
    borderColor: lightColor.primary,
  },
  chipSelectedPressed: {
    backgroundColor: lightColor.primaryPressed,
    borderColor: lightColor.primaryPressed,
  },
  chipPressed: {
    backgroundColor: lightColor.secondaryPressed,
    borderColor: lightColor.primary,
  },
  chipLabel: {
    ...typography.label,
    color: lightColor.text,
  },
  chipLabelSelected: {
    color: lightColor.onPrimary,
  },
  summary: {
    ...typography.body,
    color: lightColor.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing[8],
  },
  cell: {
    paddingBottom: spacing[12],
    paddingHorizontal: spacing[8],
  },
  tile: {
    backgroundColor: lightColor.surface,
    borderColor: lightColor.border,
    borderRadius: radius.large,
    borderWidth: 1,
    gap: spacing[4],
    minHeight: touchTarget.control,
    padding: spacing[12],
    width: '100%',
  },
  tilePressed: {
    backgroundColor: lightColor.secondaryPressed,
  },
  tileImage: {
    backgroundColor: lightColor.secondary,
    borderRadius: radius.medium,
    height: 72,
    width: '100%',
  },
  tileName: {
    ...typography.label,
    color: lightColor.text,
  },
  tileDetail: {
    ...typography.caption,
    color: lightColor.textSecondary,
  },
  stock: {
    ...typography.caption,
    color: lightColor.textSecondary,
  },
});
