import db from "@/firebase/config";
import { RootState } from "@/store";
import type { RoomMember } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

export type AddContactResult = {
  ok: boolean;
  error?: string;
};

export function useAddContact() {
  const uid = useSelector((state: RootState) => state.userData.id);
  const username = useSelector((state: RootState) => state.userData.username);

  const [loading, setLoading] = useState(false);

  const addContact = useCallback(
    async (email: string): Promise<AddContactResult> => {
      if (!email.trim() || !uid) {
        return { ok: false, error: "Ingresa un email" };
      }

      setLoading(true);

      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", email.trim().toLowerCase()),
        );

        const snap = await getDocs(q);

        if (snap.empty) {
          return { ok: false, error: "No existe ninguna cuenta con ese email" };
        }

        const contact = snap.docs[0];

        const contactUid = contact.id;
        const contactData = contact.data();

        if (contactUid === uid) {
          return { ok: false, error: "No podés agregarte a vos mismo" };
        }

        const meRef = doc(db, "users", uid);
        const meSnap = await getDoc(meRef);

        const myRooms: RoomMember[] = Array.isArray(meSnap.data()?.rooms)
          ? meSnap.data()?.rooms
          : [];

        if (myRooms.some((room) => room.name === contactData.displayName)) {
          return { ok: false, error: "Ya tenés esta conversación" };
        }

        const roomRef = await addDoc(collection(db, "rooms"), {
          createdAt: serverTimestamp(),
          createdBy: uid,
          lastMessage: "",
          lastMessageAt: serverTimestamp(),
          members: [uid, contactUid],
          membersCount: 2,
          name: `${username} - ${contactData.displayName}`,
          type: "contact",
        });
        //console.log("snap roomRef", roomRef);
        const roomId = roomRef.id;

        const contactRef = doc(db, "users", contactUid);
        const contactSnap = await getDoc(contactRef);
        const contactRooms: RoomMember[] = Array.isArray(
          contactSnap.data()?.rooms,
        )
          ? contactSnap.data()?.rooms
          : [];

        await updateDoc(meRef, {
          rooms: [...myRooms, { id: roomId, name: contactData.displayName }],
        });

        await updateDoc(contactRef, {
          rooms: [...contactRooms, { id: roomId, name: username }],
        });

        return { ok: true };
      } catch (error) {
        console.log("useAddContact", error);
        return { ok: false, error: "Ocurrió un error al agregar el contacto" };
      } finally {
        setLoading(false);
      }
    },
    [uid, username],
  );

  return { addContact, loading };
}
