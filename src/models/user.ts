export interface User {
  id: number;
  nickname: string;
  email: string;
  thumbnail: string;
  userType: UserType;
  isBlocked: boolean;
  type: LoginType;
  updatedAt: Date;
  createdAt: Date;
}

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER"
}

export enum LoginType {
  LOCAL = "LOCAL",
  FACEBOOK = "FACEBOOK"
}

export const newUser = (user: User = {} as User) => {
  return {
    id: user.id || 0,
    nickname: user.nickname || "",
    email: user.email || "",
    thumbnail: user.thumbnail || "",
    userType: user.userType || "",
    isBlocked: user.isBlocked || false,
    type: user.type || "",
    updatedAt: user.updatedAt || null,
    createdAt: user.createdAt || new Date()
  } as User;
};
