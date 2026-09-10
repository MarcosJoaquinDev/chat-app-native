import { rtdb } from "@/firebase/config";
import { Message } from "@/types";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export function useMessages(chatId: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) {
      setLoading(false);
      return;
    }

    const messagesRef = ref(rtdb, `rooms/${chatId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const parsed: Message[] = [];

      if (data) {
        Object.keys(data).forEach((key) => {
          const msg = data[key];
          parsed.push({
            id: key,
            from: msg.from,
            message: msg.message,
            createdAt: msg.createdAt,
          });
        });
      }

      parsed.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(parsed);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return { messages, loading };
}