import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRooms, RoomInfo } from "@/hooks/useRooms";
import { useAddContact } from "@/hooks/useAddContact";

const ChatTab = ({ id, name, lastMessage }: RoomInfo) => {
  const nav = useRouter();

  return (
    <Pressable
      style={s.chatCard}
      onPress={() => nav.push(`/(tabs)/chats/${id}?name=${name}`)}
    >
      <View style={s.avatar}>
        <Text style={s.avatarText}>{name.charAt(0).toUpperCase()}</Text>
      </View>

      <View style={s.chatInfo}>
        <Text style={s.nickname}>{name}</Text>
        <Text style={s.lastMessage}>
          {lastMessage || "Toca para abrir la conversación"}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color="#64748B" />
    </Pressable>
  );
};

export default function ContactsTab() {
  const [text, onChangeText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [error, setError] = useState("");

  const { rooms, loading, refresh } = useRooms();
  const { addContact, loading: addingContact } = useAddContact();

  const filteredContacts = rooms.filter((item) =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );

  const openModal = () => {
    setContactEmail("");
    setError("");
    setModalVisible(true);
  };

  const closeModal = () => {
    if (addingContact) return;
    setModalVisible(false);
  };

  const handleAddContact = async () => {
    setError("");
    const result = await addContact(contactEmail);

    if (result.ok) {
      setModalVisible(false);
      setContactEmail("");
      refresh();
    } else {
      setError(result.error ?? "Ocurrió un error");
    }
  };

  return (
    <LinearGradient
      colors={["#0F172A", "#111827", "#1E293B"]}
      style={s.container}
    >
      {/* Header */}
      <View style={s.header}>
        <View style={{ flex: 1 }}>
          <Text style={s.title}>Chats 💬</Text>
          <Text style={s.subtitle}>Encontrá y hablá con tus contactos.</Text>
        </View>

        <Pressable style={s.addButton} onPress={openModal}>
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
      </View>

      {/* Search */}
      <View style={s.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" />

        <TextInput
          style={s.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Buscar contacto..."
          placeholderTextColor="#94A3B8"
        />
      </View>

      {/* Chats */}
      {loading ? (
        <ActivityIndicator color="#fff" size="large" />
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={({ item }) => (
            <ChatTab
              id={item.id}
              name={item.name}
              lastMessage={item.lastMessage}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        />
      )}

      {/* Add contact modal */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={s.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Agregar contacto</Text>
            <Text style={s.modalSubtitle}>
              Ingresá el email de la persona con la que querés hablar.
            </Text>

            <TextInput
              style={s.modalInput}
              value={contactEmail}
              onChangeText={setContactEmail}
              placeholder="email"
              placeholderTextColor="#94A3B8"
              textContentType="emailAddress"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {error ? <Text style={s.modalError}>{error}</Text> : null}

            <View style={s.modalButtons}>
              <Pressable
                style={[s.modalButton, s.cancelButton]}
                onPress={closeModal}
              >
                <Text style={s.cancelButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[
                  s.modalButton,
                  s.confirmButton,
                  addingContact && s.confirmButtonDisabled,
                ]}
                onPress={handleAddContact}
                disabled={addingContact}
              >
                {addingContact ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={s.confirmButtonText}>Agregar</Text>
                )}
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  header: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 6,
    fontSize: 15,
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },

  searchContainer: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 10,
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  chatInfo: {
    flex: 1,
  },

  nickname: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  lastMessage: {
    color: "#94A3B8",
    fontSize: 14,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  modalCard: {
    backgroundColor: "#1E293B",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },

  modalSubtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },

  modalInput: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 16,
  },

  modalError: {
    color: "#F87171",
    fontSize: 14,
    marginTop: 12,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButton: {
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  cancelButtonText: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "600",
  },

  confirmButton: {
    backgroundColor: "#2563EB",
  },

  confirmButtonDisabled: {
    opacity: 0.6,
  },

  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});