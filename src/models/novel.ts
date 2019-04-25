export interface Novel {
  id: number;
  text: string;
  updatedAt: Date;
  createdAt: Date;
  like: number;
  dislike: number;
  isLike: number;
}

export const newNovel = (novel: Novel = {} as Novel) => ({
  id: novel.id || 0,
  text: novel.text || "",
  updatedAt: novel.updatedAt || null,
  createdAt: novel.createdAt || new Date(),
  like: novel.like || 0,
  dislike: novel.dislike || 0,
  isLike: novel.isLike || null
} as Novel);
