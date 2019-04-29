export interface Room {
  id: number;
  writerLimit: number;
  tags: string;
  title: string;
  desc: string;
  updatedAt: Date;
  createdAt: Date;
  like: number;
}

export interface RoomInfo {
  room: Array<Room>,
  joinedUserTotal: number,
  isWriteable: boolean,
  isLike: boolean,
  writerLimit: number,
  novelTotal: number
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
    like: room.like || 0
  } as Room;
};
