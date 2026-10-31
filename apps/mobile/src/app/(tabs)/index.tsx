import { router } from 'expo-router';
import { type ReactNode, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { APP_NAME } from '@luminatech/contracts';

import {
  homeCatalog,
  type HomeCategory,
  type HomeProduct,
} from '@/catalog/home-catalog';
import { catalogImages } from '@/catalog/images';
import { lightColor } from '@/design-system/color';
import { ProductCard } from '@/design-system/components/product-card';
import { ScreenContainer } from '@/design-system/components/screen';
import { SearchBar } from '@/design-system/components/search-bar';
import { tabScreenEdges } from '@/design-system/layout';
import { radius } from '@/design-system/radius';
import { spacing } from '@/design-system/spacing';
import { typography } from '@/design-system/typography';

export default function HomeScreen() {
  const [query, setQuery] = useState('');

  return (
    <ScreenContainer edges={tabScreenEdges}>
      <Text accessibilityRole="header" style={styles.brand}>
        {APP_NAME}
      </Text>
      <SearchBar
        label="Search products"
        onChangeText={setQuery}
        onSubmit={(value) => {
          const nextQuery = value.trim();
          router.push(
            nextQuery
              ? { pathname: '/search', params: { q: nextQuery } }
              : { pathname: '/search' },
          );
        }}
        placeholder="Search products"
        value={query}
      />
      <ScrollView
        contentContainerStyle={styles.catalog}
        keyboardShouldPersistTaps="handled"
        style={styles.catalogScroll}
      >
        <Banner />
        <Section title="Categories">
          <ScrollView
            horizontal
            contentContainerStyle={styles.shortcuts}
            showsHorizontalScrollIndicator={false}
          >
            {homeCatalog.categories.map((category) => (
              <CategoryShortcut category={category} key={category.id} />
            ))}
          </ScrollView>
        </Section>
        <ProductSection products={homeCatalog.featured} title="Featured" />
        <ProductSection
          products={homeCatalog.popularElectrical}
          title="Popular electrical"
        />
        <ProductSection
          products={homeCatalog.recentlyViewed}
          title="Recently viewed"
        />
      </ScrollView>
    </ScreenContainer>
  );
}

function Banner() {
  const { banner } = homeCatalog;
  const label = `${banner.title}. ${banner.message}`;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={() => openProduct(banner.productId)}
      style={({ pressed }) => [
        styles.banner,
        pressed ? styles.bannerPressed : null,
      ]}
    >
      <Image
        accessible={false}
        source={catalogImages[banner.image]}
        style={styles.bannerImage}
      />
      <View style={styles.bannerCopy}>
        <Text style={styles.bannerTitle}>{banner.title}</Text>
        <Text style={styles.bannerMessage}>{banner.message}</Text>
      </View>
    </Pressable>
  );
}

function CategoryShortcut({ category }: { category: HomeCategory }) {
  return (
    <Pressable
      accessibilityLabel={category.name}
      accessibilityRole="button"
      onPress={() =>
        router.push({
          pathname: '/categories',
          params: { category: category.id },
        })
      }
      style={styles.shortcut}
    >
      <Image
        accessible={false}
        source={catalogImages[category.image]}
        style={styles.shortcutImage}
      />
      <Text style={styles.shortcutLabel}>{category.name}</Text>
    </Pressable>
  );
}

function ProductSection({
  title,
  products,
}: {
  title: string;
  products: readonly HomeProduct[];
}) {
  return (
    <Section title={title}>
      <View style={styles.productList}>
        {products.map((product) => (
          <ProductCard
            amount={product.amount}
            currency={product.currency}
            detail={product.detail}
            image={catalogImages[product.image]}
            key={product.id}
            name={product.name}
            onPress={() => openProduct(product.id)}
          />
        ))}
      </View>
    </Section>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function openProduct(productId: string) {
  router.push({
    pathname: '/product/[productId]',
    params: { productId },
  });
}

const styles = StyleSheet.create({
  brand: {
    ...typography.title,
    color: lightColor.text,
  },
  catalogScroll: {
    flex: 1,
    width: '100%',
  },
  catalog: {
    gap: spacing[24],
    paddingBottom: spacing[24],
  },
  banner: {
    alignItems: 'center',
    backgroundColor: lightColor.secondary,
    borderColor: lightColor.primary,
    borderRadius: radius.large,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing[16],
    minHeight: 96,
    overflow: 'hidden',
  },
  bannerPressed: {
    backgroundColor: lightColor.secondaryPressed,
  },
  bannerImage: {
    height: 96,
    width: 120,
  },
  bannerCopy: {
    flex: 1,
    gap: spacing[4],
    paddingRight: spacing[16],
  },
  bannerTitle: {
    ...typography.heading,
    color: lightColor.text,
  },
  bannerMessage: {
    ...typography.body,
    color: lightColor.textSecondary,
  },
  section: {
    gap: spacing[12],
  },
  sectionTitle: {
    ...typography.heading,
    color: lightColor.text,
  },
  shortcuts: {
    gap: spacing[12],
  },
  shortcut: {
    alignItems: 'center',
    gap: spacing[8],
    minHeight: 88,
    minWidth: 88,
  },
  shortcutImage: {
    backgroundColor: lightColor.secondary,
    borderRadius: radius.large,
    height: 64,
    width: 64,
  },
  shortcutLabel: {
    ...typography.label,
    color: lightColor.text,
  },
  productList: {
    gap: spacing[12],
  },
});
