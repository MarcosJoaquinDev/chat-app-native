import type { RootState } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
export default function ProfileTab() {
  const userData = useSelector((state: RootState) => state.userData);
  console.log(userData);

  return (
    <LinearGradient
      colors={["#0F172A", "#111827", "#1E293B"]}
      style={s.container}
    >
      <ScrollView
        contentContainerStyle={s.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={s.header}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{userData.username?.charAt(0)}</Text>
          </View>

          <Text style={s.name}>{userData.username}</Text>

          <Text style={s.email}>{userData.email}</Text>

          <View style={s.badge}>
            <Text style={s.badgeText}>Premium</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={s.statsContainer}>
          <View style={s.statCard}>
            <Text style={s.statNumber}>28</Text>
            <Text style={s.statLabel}>Chats</Text>
          </View>

          <View style={s.statCard}>
            <Text style={s.statNumber}>142</Text>
            <Text style={s.statLabel}>Mensajes</Text>
          </View>

          <View style={s.statCard}>
            <Text style={s.statNumber}>99%</Text>
            <Text style={s.statLabel}>Activo</Text>
          </View>
        </View>

        {/* Options */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Configuración</Text>

          <Pressable style={s.optionCard}>
            <View style={s.optionLeft}>
              <View style={[s.iconContainer, { backgroundColor: "#2563EB" }]}>
                <Ionicons name="person-outline" size={22} color="#fff" />
              </View>

              <View>
                <Text style={s.optionTitle}>Editar perfil</Text>
                <Text style={s.optionSubtitle}>
                  Cambiá tu información personal
                </Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#64748B" />
          </Pressable>

          <Pressable style={s.optionCard}>
            <View style={s.optionLeft}>
              <View style={[s.iconContainer, { backgroundColor: "#7C3AED" }]}>
                <Ionicons name="notifications-outline" size={22} color="#fff" />
              </View>

              <View>
                <Text style={s.optionTitle}>Notificaciones</Text>
                <Text style={s.optionSubtitle}>
                  Configurá alertas y sonidos
                </Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#64748B" />
          </Pressable>

          <Pressable style={s.optionCard}>
            <View style={s.optionLeft}>
              <View style={[s.iconContainer, { backgroundColor: "#F59E0B" }]}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={22}
                  color="#fff"
                />
              </View>

              <View>
                <Text style={s.optionTitle}>Privacidad</Text>
                <Text style={s.optionSubtitle}>Controlá tu seguridad</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#64748B" />
          </Pressable>
        </View>

        {/* Logout */}
        <Pressable style={s.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />

          <Text style={s.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 120,
  },

  header: {
    alignItems: "center",
    marginBottom: 34,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 40,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  avatarText: {
    color: "#fff",
    fontSize: 44,
    fontWeight: "700",
  },

  name: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },

  email: {
    color: "#94A3B8",
    fontSize: 15,
    marginTop: 6,
  },

  badge: {
    marginTop: 16,
    backgroundColor: "rgba(37,99,235,0.18)",
    borderWidth: 1,
    borderColor: "rgba(37,99,235,0.3)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },

  badgeText: {
    color: "#60A5FA",
    fontWeight: "600",
  },

  statsContainer: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 34,
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    paddingVertical: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  statNumber: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  statLabel: {
    color: "#94A3B8",
    marginTop: 6,
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  optionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  optionSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 4,
  },

  logoutButton: {
    height: 62,
    borderRadius: 22,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
