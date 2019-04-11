export interface Novel {
  id: number;
  text: string;
  roomId: number;
  userId: number;
  like: number;
  dislike: number;
  updatedAt: Date;
  createdAt: Date;
}

export const newNovel = () => ({
  id: 0,
  text: "",
  roomId: 0,
  userId: 0,
  like: 0,
  dislike: 0,
  updatedAt: new Date(),
  createdAt: new Date(),
});
