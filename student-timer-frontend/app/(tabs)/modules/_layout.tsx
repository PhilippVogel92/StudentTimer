import { Stack } from "expo-router";

export default function ModulesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/index"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "default",
        }}
      />
      <Stack.Screen name="new/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="new/learningsUnits"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
