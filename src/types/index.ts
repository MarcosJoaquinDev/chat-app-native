export interface Room {
  id: string;
  name: string;
  members: string[];
  membersCount: number;
  lastMessage: string;
  lastMessageAt: string;
  createdAt: string;
  createdBy: string;
  type: "contact";
}

export interface RoomMember {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  from: string;
  message: string;
  createdAt: number;
}
