import { store } from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerStyle: { backgroundColor: "#003" },
            headerTitleStyle: { color: "#fff" },
          }}
        />
        <Stack.Screen
          name="signIn"
          options={{
            title: "Ingresar",
            headerStyle: { backgroundColor: "#003" },
            headerTitleStyle: { color: "#fff" },
          }}
        />
        <Stack.Screen
          name="signUp"
          options={{
            title: "Registrarse",
            headerStyle: { backgroundColor: "#003" },
            headerTitleStyle: { color: "#fff" },
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
