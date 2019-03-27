export interface User {
    id: number,
    nickname: string,
    email: string,
    thumbnail: string,
    isAdmin: boolean,
    isBlocked: boolean,
    type: string,
    updatedAt: Date,
    createdAt: Date,
}

export const newUser = () => {
    return {
        id: 0,
        nickname: "",
        email: "",
        thumbnail: "",
        isAdmin: false,
        isBlocked: false,
        type: "",
        updatedAt: new Date(),
        createdAt: new Date(),
    } as User
}