import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { type ColorValue } from 'react-native';

import { lightColor } from '@/design-system/color';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: lightColor.primary,
        tabBarInactiveTintColor: lightColor.textSecondary,
        tabBarStyle: {
          backgroundColor: lightColor.surface,
          borderTopColor: lightColor.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon android="home" color={color} ios="house.fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => (
            <TabIcon
              android="grid_view"
              color={color}
              ios="square.grid.2x2.fill"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <TabIcon android="search" color={color} ios="magnifyingglass" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <TabIcon android="shopping_cart" color={color} ios="cart.fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <TabIcon android="person" color={color} ios="person.fill" />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  ios,
  android,
  color,
}: {
  ios:
    | 'house.fill'
    | 'square.grid.2x2.fill'
    | 'magnifyingglass'
    | 'cart.fill'
    | 'person.fill';
  android: 'home' | 'grid_view' | 'search' | 'shopping_cart' | 'person';
  color: ColorValue;
}) {
  return (
    <SymbolView
      name={{ android, ios, web: android }}
      size={22}
      tintColor={color}
    />
  );
}
