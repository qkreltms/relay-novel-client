export interface Room {
  id: number;
  writerLimit: number;
  tags: string;
  title: string;
  desc: string;
  updatedAt: Date;
  createdAt: Date;
  like: number;
  dislike: number;
}

export const newRoom = (room: Room = {} as Room) => {
  return {
    id: room.id || 0,
    writerLimit: room.writerLimit || 100,
    tags: room.tags || "",
    title: room.title || "",
    desc: room.desc || "",
    updatedAt: room.updatedAt || null,
    createdAt: room.createdAt || new Date(),
    like: room.like || 0,
    dislike: room.dislike || 0
  } as Room;
};
