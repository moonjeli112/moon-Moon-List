// Bottom tabs layout. Each file inside app/(tabs) becomes one tab:
//   index.tsx    -> My List
//   progress.tsx -> Progress
//   about.tsx    -> About

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useCSSVariable, useResolveClassNames } from 'uniwind';

export default function TabsLayout() {
  // Colors come from global.css, so the theme stays in one place
  const activeColor = (useCSSVariable('--color-moon-rose') as string) ?? '#f43f5e';
  const inactiveColor = (useCSSVariable('--color-moon-mauve') as string) ?? '#9d6b85';

  // Tailwind classes turned into style objects for the tab bar
  const tabBarStyle = useResolveClassNames('bg-white border-t border-moon-petal');
  const tabBarLabelStyle = useResolveClassNames('text-xs font-bold');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle,
        tabBarLabelStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'My List',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'moon' : 'moon-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'flower' : 'flower-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
    </Tabs>
  );
}
