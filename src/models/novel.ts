export interface Novel {
  text: string;
  updatedAt: Date;
  createdAt: Date;
  like: number;
  dislike: number;
}

export const newNovel = (text: string = "") => ({
  text,
  updatedAt: new Date(),
  createdAt: new Date(),
  like: 0,
  dislike: 0
});
