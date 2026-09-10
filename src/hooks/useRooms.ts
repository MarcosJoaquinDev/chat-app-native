import { RootState } from "@/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import db from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import type { Room, RoomMember } from "@/types";

export interface RoomInfo extends RoomMember {
  lastMessage?: string;
  members?: string[];
  type?: "contact";
}

export function useRooms() {
  const uid = useSelector((state: RootState) => state.userData.id);
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadRooms = async () => {
      try {
        const userSnap = await getDoc(doc(db, "users", uid));
        if (!userSnap.exists() || cancelled) return;

        const userRooms: RoomMember[] = Array.isArray(userSnap.data()?.rooms)
          ? userSnap.data()?.rooms
          : [];

        const fullRooms = await Promise.all(
          userRooms.map(async (room) => {
            const roomSnap = await getDoc(doc(db, "rooms", room.id));
            if (!roomSnap.exists()) return { ...room } as RoomInfo;

            const roomData = roomSnap.data() as Room;
            return {
              id: room.id,
              name: room.name,
              lastMessage: roomData.lastMessage,
              members: roomData.members,
              type: roomData.type,
            } as RoomInfo;
          })
        );

        if (!cancelled) setRooms(fullRooms);
      } catch (error) {
        console.log("useRooms", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadRooms();

    return () => {
      cancelled = true;
    };
  }, [uid, refreshKey]);

  const refresh = useCallback(() => {
    setRefreshKey((key) => key + 1);
  }, []);

  return { rooms, loading, refresh };
}