export interface Tweet extends TweetBody {
   id: number
   createdAt: string
   updatedAt: string
   blockTweet: boolean
   image?: string
   user: {
      id: number
      username: string
      blocked: boolean
      profileImage?: string | null
   }
   comments?: Comments[]
   likes: Likes[]
}

export interface Comments extends CommentBody {
   id: number
   createdAt: string
   updatedAt: string
   blockComment: boolean
   user: {
      id: number
      username: string
      profileImage?: string | null
      blocked: boolean
   }
   likes: Likes[]
}

export interface User {
   id: number
   username: string
   about?: string
   email: string
   confirmed: boolean
   blocked: boolean
   createdAt: string
   updatedAt: string
   profileImage?: string
}

export type TweetBody = {
   text: string
}

export type CommentBody = {
   comment: string
}

export interface Likes {
   id: number
}