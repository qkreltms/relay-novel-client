export interface LikeDislike {
  id: number;
  userId: number;
  roomId: number;
  like: boolean;
  dislike: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export const newLikeDislike = () => {
  return {
    id: 0,
    roomId: 0,
    like: false,
    dislike: false,
    userId: 0,
    updatedAt: new Date(),
    createdAt: new Date()
  } as LikeDislike;
};
