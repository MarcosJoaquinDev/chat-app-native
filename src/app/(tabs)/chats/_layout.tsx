import { Stack } from "expo-router";

export default function ChatsStackLayout() {
  return (
    <Stack>
      {/* index corresponde a la lista de chats */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* [chatId] corresponde a la conversación */}
      <Stack.Screen
        name="[chatId]"
        options={{
          title: "Conversación",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
