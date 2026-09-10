import { Ionicons } from "@expo/vector-icons";
import db from "@/firebase/config";
import { LinearGradient } from "expo-linear-gradient";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleSend = async () => {
    if (!email || !password || !nickname) {
      alert("Completa todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Ingresa un email válido");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: nickname,
        photoURL: "",
        createdAt: serverTimestamp(),

        rooms: {},
      });
    } catch (err: any) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            alert("Ese email ya está registrado");
            break;

          case "auth/invalid-email":
            alert("El email no es válido");
            break;

          case "auth/weak-password":
            alert("La contraseña es demasiado débil");
            break;

          case "auth/network-request-failed":
            alert("Error de conexión");
            break;

          default:
            alert("Ocurrió un error al crear la cuenta");
        }
      } else {
        alert("Error desconocido");
      }
    } finally {
      setLoading(false);
      setEmail("");
      setNickname("");
      setPassword("");
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
            <Ionicons name="person-add-outline" size={32} color="#fff" />
          </View>

          <Text style={styles.title}>Creá tu cuenta</Text>
          <Text style={styles.subtitle}>
            Completá tus datos para empezar a chatear.
          </Text>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={nickname}
            onChangeText={setNickname}
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
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
                <Text style={styles.buttonText}>Registrate</Text>
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