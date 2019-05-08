export interface Comment {
  id: number;
  text: string;
  updatedAt: Date;
  createdAt: Date;
  like: number;
  dislike: number;
  isLike: number;
}

export const newComment = (comment: Comment = {} as Comment) =>
  ({
    id: comment.id || 0,
    text: comment.text || "",
    updatedAt: comment.updatedAt || null,
    createdAt: comment.createdAt || new Date(),
    like: comment.like || 0,
    dislike: comment.dislike || 0,
    isLike: comment.isLike || null
  } as Comment);
