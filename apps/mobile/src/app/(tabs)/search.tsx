import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { ProductBrowser } from '@/catalog/product-browser';
import { lightColor } from '@/design-system/color';
import { ScreenContainer } from '@/design-system/components/screen';
import { tabScreenEdges } from '@/design-system/layout';
import { typography } from '@/design-system/typography';
import { singleRouteParam } from '@/navigation/routes';

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const requestedQuery = singleRouteParam(params.q);
  const [query, setQuery] = useState(requestedQuery);

  useEffect(() => {
    // The search tab stays mounted, so a later Home search has to replace the field.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(requestedQuery);
  }, [requestedQuery]);

  return (
    <ScreenContainer edges={tabScreenEdges}>
      <Text accessibilityRole="header" style={styles.title}>
        Search
      </Text>
      <ProductBrowser onQueryChange={setQuery} query={query} showSearch />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.heading,
    color: lightColor.text,
  },
});
