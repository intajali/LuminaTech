import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import {
  catalogCategories,
  categoryById,
  defaultCatalogFilters,
  filterCatalog,
  type CatalogCategory,
} from '@/catalog/catalog';
import { ProductBrowser } from '@/catalog/product-browser';
import { lightColor } from '@/design-system/color';
import { Button } from '@/design-system/components/button';
import { CategoryCard } from '@/design-system/components/category-card';
import { ScreenContainer } from '@/design-system/components/screen';
import { tabScreenEdges } from '@/design-system/layout';
import { spacing } from '@/design-system/spacing';
import { typography } from '@/design-system/typography';
import { singleRouteParam } from '@/navigation/routes';

type BrowseState = {
  categoryId: string;
  subcategoryId: string;
  showProducts: boolean;
};

export default function CategoriesScreen() {
  const params = useLocalSearchParams();
  const requestedCategory = singleRouteParam(params.category);
  const [browse, setBrowse] = useState<BrowseState>({
    categoryId: requestedCategory,
    subcategoryId: '',
    showProducts: false,
  });

  useEffect(() => {
    // The categories tab stays mounted, so a later Home shortcut has to open that category.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBrowse({
      categoryId: requestedCategory,
      subcategoryId: '',
      showProducts: false,
    });
  }, [requestedCategory]);

  const category = categoryById(browse.categoryId);
  const subcategory = category?.subcategories.find(
    (item) => item.id === browse.subcategoryId,
  );
  const title = browse.showProducts
    ? (subcategory?.name ?? (category ? `All ${category.name}` : 'Categories'))
    : (category?.name ?? 'Categories');

  return (
    <ScreenContainer edges={tabScreenEdges}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {browse.showProducts && category ? (
        <>
          <Button
            label={`Back to ${category.name}`}
            onPress={() =>
              setBrowse({
                categoryId: category.id,
                subcategoryId: '',
                showProducts: false,
              })
            }
            variant="ghost"
          />
          <ProductBrowser
            categoryId={category.id}
            lockCategory
            showSearch
            subcategoryId={browse.subcategoryId}
          />
        </>
      ) : category ? (
        <SubcategoryList
          category={category}
          onBack={() => {
            setBrowse({
              categoryId: '',
              subcategoryId: '',
              showProducts: false,
            });
            if (requestedCategory) {
              router.replace('/categories');
            }
          }}
          onOpen={(subcategoryId) =>
            setBrowse({
              categoryId: category.id,
              subcategoryId,
              showProducts: true,
            })
          }
        />
      ) : (
        <CategoryList
          onOpen={(categoryId) =>
            setBrowse({
              categoryId,
              subcategoryId: '',
              showProducts: false,
            })
          }
        />
      )}
    </ScreenContainer>
  );
}

function CategoryList({ onOpen }: { onOpen: (categoryId: string) => void }) {
  return (
    <ScrollView contentContainerStyle={styles.list} style={styles.scroll}>
      {catalogCategories.map((category) => (
        <CategoryCard
          detail={`${productCount(category.id)} products`}
          key={category.id}
          name={category.name}
          onPress={() => onOpen(category.id)}
        />
      ))}
    </ScrollView>
  );
}

function SubcategoryList({
  category,
  onBack,
  onOpen,
}: {
  category: CatalogCategory;
  onBack: () => void;
  onOpen: (subcategoryId: string) => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.list} style={styles.scroll}>
      <Button label="All categories" onPress={onBack} variant="ghost" />
      <CategoryCard
        detail={`${productCount(category.id)} products`}
        name={`All ${category.name}`}
        onPress={() => onOpen('')}
      />
      {category.subcategories.map((subcategory) => (
        <CategoryCard
          detail={`${productCount(category.id, subcategory.id)} products`}
          key={subcategory.id}
          name={subcategory.name}
          onPress={() => onOpen(subcategory.id)}
        />
      ))}
    </ScrollView>
  );
}

function productCount(categoryId: string, subcategoryId = '') {
  return filterCatalog({
    ...defaultCatalogFilters,
    categoryId,
    subcategoryId,
  }).length;
}

const styles = StyleSheet.create({
  title: {
    ...typography.heading,
    color: lightColor.text,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  list: {
    gap: spacing[12],
    paddingBottom: spacing[24],
  },
});
