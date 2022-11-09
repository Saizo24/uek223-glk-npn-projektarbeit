import { Author } from "./Author.model"
import { User } from "./User.model"

export type ImagePost = {
    id: string
    imageURL: string
    description: string
    author: Author
    publicationTime: Date
    likes: User[]
}