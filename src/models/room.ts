import { User } from "./user";

export interface Room {
  id: number;
  writerLimit: number;
  tags: string;
  title: string;
  desc: string;
  updatedAt: Date;
  createdAt: Date;
  like: number;
  genre: string;
  creatorId: number;
  coverImage: string;
  novelTotal: number;
  isLike: boolean;
  joinedUserTotal: number;
  isWriteable: boolean;
  user: User;
}

export const newRoom = (room: Room = {} as Room) => {
  return {
    id: room.id || 0,
    writerLimit: room.writerLimit || 100,
    tags: room.tags || "",
    title: room.title || "",
    desc: room.desc || "",
    like: room.like || 0
  } as Room;
};
