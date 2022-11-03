import { User } from "./User.model"

export type ImagePost = {
    id: string
    imageURL: string
    description: string
    author: User
    publicationTime: Date
    likes: User[]
}