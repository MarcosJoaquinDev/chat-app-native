import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const navigate = useRouter();

  return (
    <LinearGradient
      colors={["#0F172A", "#111827", "#1E293B"]}
      style={styles.container}
    >
      {/* Hero */}
      <View style={styles.heroContainer}>
        <View style={styles.logoWrapper}>
          <Ionicons name="chatbubbles" size={40} color="#fff" />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.mainTitle}>Hablar nunca fue tan fácil</Text>
            <Text style={styles.subtitle}>
              Plataforma de mensajes para desarrolladores
            </Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigate.navigate("/signIn")}
        >
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <Text style={styles.outlineButtonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigate.navigate("/signUp")}
        >
          <Ionicons name="person-add-outline" size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 60,
  },
  heroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  heroCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  heroContent: {
    gap: 12,
    alignItems: "center",
  },
  mainTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    fontStyle: "italic",
  },
  buttonsContainer: {
    gap: 14,
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  outlineButton: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  outlineButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});