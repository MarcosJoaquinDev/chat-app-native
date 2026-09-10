import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#0F172A", "#111827", "#1E293B"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Bienvenido 👋</Text>
            <Text style={styles.subtitle}>
              Ya estás conectado a tu aplicación.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("/(tabs)/profile")}
          >
            <Ionicons name="person" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Tu espacio está listo 🚀</Text>
            <Text style={styles.heroText}>
              Accedé rápidamente a tus chats, perfil y todas las funciones.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/(tabs)/chats")}
            >
              <Text style={styles.primaryButtonText}>Ir a Chats</Text>
              <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Accesos rápidos</Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/(tabs)/chats")}
          >
            <View style={[styles.iconWrapper, { backgroundColor: "#2563EB" }]}>
              <Ionicons name="chatbubbles" size={24} color="#fff" />
            </View>

            <Text style={styles.actionTitle}>Chats</Text>
            <Text style={styles.actionText}>Ver conversaciones activas.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/(tabs)/profile")}
          >
            <View style={[styles.iconWrapper, { backgroundColor: "#7C3AED" }]}>
              <Ionicons name="person-circle" size={24} color="#fff" />
            </View>

            <Text style={styles.actionTitle}>Perfil</Text>
            <Text style={styles.actionText}>Administrá tu cuenta y datos.</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Actividad reciente</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Chats</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Mensajes nuevos</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>99%</Text>
              <Text style={styles.statLabel}>Online</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 70,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  welcome: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 15,
    marginTop: 6,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  heroCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 28,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  heroContent: {
    gap: 14,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  heroText: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 24,
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 30,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  actionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  actionText: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
  },
  statsCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statsTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  statLabel: {
    color: "#94A3B8",
    marginTop: 6,
  },
});
