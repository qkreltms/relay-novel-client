import { newUser } from "./user";

export interface Room {
    id: number,
    writerLimit: number,
    tags: string,
    title: string,
    desc: string,
    creatorId: number,
    updatedAt: Date,
    createdAt: Date,
}

export const newRoom = () => {
    return {
        id: 0,
        writerLimit: 100,
        tags: "",
        title: "",
        desc: "",
        creatorId: newUser(),
        updatedAt: new Date(),
        createdAt: new Date(),
    }
}