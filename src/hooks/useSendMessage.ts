import { rtdb } from "@/firebase/config";
import { RootState } from "@/store";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export function useSendMessage(chatId: string | undefined) {
  const uid = useSelector((state: RootState) => state.userData.id);

  const sendMessage = useCallback(
    async (text: string): Promise<boolean> => {
      if (!chatId || !uid || !text.trim()) return false;

      try {
        const messageRef = push(ref(rtdb, `rooms/${chatId}/messages`));
        await set(messageRef, {
          from: uid,
          message: text.trim(),
          createdAt: serverTimestamp(),
        });
        return true;
      } catch (error) {
        console.log("useSendMessage", error);
        return false;
      }
    },
    [chatId, uid],
  );

  return { sendMessage };
}
