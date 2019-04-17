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

export const newRoom = () => {
  return {
    id: 0,
    writerLimit: 100,
    tags: "",
    title: "",
    desc: "",
    updatedAt: new Date(),
    createdAt: new Date(),
    like: 0,
    dislike: 0
  } as Room;
};
