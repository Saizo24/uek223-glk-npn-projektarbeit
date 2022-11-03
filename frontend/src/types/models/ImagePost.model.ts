import { User } from "./User.model"

export type ImagePost = {
    imageUrl: string
    description: string
    author: User
    publicationTime: Date
    likes: User[]
}