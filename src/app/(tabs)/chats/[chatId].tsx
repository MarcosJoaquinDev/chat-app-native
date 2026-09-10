import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useMessages } from "@/hooks/useMessages";
import { useSendMessage } from "@/hooks/useSendMessage";

function formatTime(timestamp: number): string {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "";

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function ChatId() {
  const { chatId, name } = useLocalSearchParams();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const uid = useSelector((state: RootState) => state.userData.id);

  const { messages } = useMessages(
    typeof chatId === "string" ? chatId : undefined
  );
  const { sendMessage } = useSendMessage(
    typeof chatId === "string" ? chatId : undefined
  );

  const contactName =
    typeof name === "string" && name ? name : `Usuario ${chatId}`;

  const handleSend = async () => {
    const ok = await sendMessage(message);
    if (ok) setMessage("");
  };

  return (
    <LinearGradient
      colors={["#0F172A", "#111827", "#1E293B"]}
      style={s.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={s.header}>
          <Pressable style={s.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>

          <View style={s.avatar}>
            <Text style={s.avatarText}>
              {contactName.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={s.username}>{contactName}</Text>
            <Text style={s.status}>En línea</Text>
          </View>

          <Pressable style={s.iconButton}>
            <Ionicons name="call" size={20} color="#fff" />
          </Pressable>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={s.messagesContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const mine = item.from === uid;
            return (
              <View
                style={[
                  s.messageWrapper,
                  mine ? s.myMessageWrapper : s.otherMessageWrapper,
                ]}
              >
                <View
                  style={[
                    s.messageBubble,
                    mine ? s.myBubble : s.otherBubble,
                  ]}
                >
                  <Text style={s.messageText}>{item.message}</Text>

                  <Text style={s.messageTime}>{formatTime(item.createdAt)}</Text>
                </View>
              </View>
            );
          }}
        />

        {/* Input */}
        <View style={s.inputContainer}>
          <Pressable style={s.plusButton}>
            <Ionicons name="add" size={24} color="#94A3B8" />
          </Pressable>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Escribí un mensaje..."
            placeholderTextColor="#94A3B8"
            style={s.input}
          />

          <Pressable style={s.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 65,
    paddingHorizontal: 20,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  status: {
    color: "#22C55E",
    marginTop: 2,
    fontSize: 13,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },

  messagesContainer: {
    padding: 20,
    paddingBottom: 120,
  },

  messageWrapper: {
    marginBottom: 14,
    flexDirection: "row",
  },

  myMessageWrapper: {
    justifyContent: "flex-end",
  },

  otherMessageWrapper: {
    justifyContent: "flex-start",
  },

  messageBubble: {
    maxWidth: "78%",
    padding: 14,
    borderRadius: 22,
  },

  myBubble: {
    backgroundColor: "#2563EB",
    borderBottomRightRadius: 6,
  },

  otherBubble: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderBottomLeftRadius: 6,
  },

  messageText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },

  messageTime: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    marginTop: 8,
    alignSelf: "flex-end",
  },

  inputContainer: {
    position: "absolute",
    bottom: 95,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    paddingHorizontal: 10,
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
});