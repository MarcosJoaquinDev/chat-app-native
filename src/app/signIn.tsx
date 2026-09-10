import { Ionicons } from "@expo/vector-icons";
import { setEmail, setId, setUsername } from "@/data/user";
import db from "@/firebase/config";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const [email, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const router = useRouter();

  const dispatch = useDispatch();

  const handleSend = async (): Promise<void> => {
    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Ingresa un email válido");
      return;
    }

    setLoading(true);

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userDocRef);

      dispatch(setEmail(userSnap.data()?.email as string));
      console.log("usersnap", userSnap.data()?.displayName);

      dispatch(setUsername(userSnap.data()?.displayName as string));
      dispatch(setId(user.uid));

      alert("Inicio de sesión exitoso");

      setLocalEmail("");
      setPassword("");
      router.navigate("/(tabs)");
    } catch (err: unknown) {
      console.log(err);

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-email":
            alert("El email no es válido");
            break;

          case "auth/user-not-found":
            alert("No existe una cuenta con ese email");
            break;

          case "auth/wrong-password":
            alert("Contraseña incorrecta");
            break;

          case "auth/invalid-credential":
            alert("Email o contraseña incorrectos");
            break;

          case "auth/too-many-requests":
            alert("Demasiados intentos. Intenta más tarde");
            break;

          case "auth/network-request-failed":
            alert("Error de conexión");
            break;

          default:
            alert("Ocurrió un error al iniciar sesión");
        }
      } else {
        alert("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={["#0F172A", "#111827", "#1E293B"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Ionicons name="log-in-outline" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Bienvenido de nuevo</Text>
          <Text style={styles.subtitle}>
            Ingresa tu email y contraseña para continuar.
          </Text>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={setLocalEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#94A3B8"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            placeholderTextColor="#94A3B8"
            textContentType="password"
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSend}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonText}>Ingresar</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    gap: 12,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    gap: 14,
  },
  input: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 16,
  },
  button: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});