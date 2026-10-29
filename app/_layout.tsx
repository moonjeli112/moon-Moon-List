// Root layout: runs first. It loads Tailwind (global.css),
// gives every screen the shared list data, and shows the (tabs) group.

import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MoonItemProvider } from '../context/MoonItemContext';

export default function RootLayout() {
  return (
    <MoonItemProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </MoonItemProvider>
  );
}
