import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  return (
    <Stack>
      {/* index corresponde a la lista de chats */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
