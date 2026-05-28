import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
      <Stack.Screen name="main" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="splash" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}