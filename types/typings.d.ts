export interface Tweet extends TweetBody {
   id: string
   createdAt: string
   updatedAt: string
   blockTweet: boolean
   image?: string
   user: {
      id: string
      username: string
      blocked: boolean
      profileImage?: string
   }
   comments?: Comments[]
}

export interface Comments extends CommentBody {
   id: string
   createdAt: string
   updatedAt: string
   blockComment: boolean
   user: {
      id: string
      username: string
      profileImage?: string
      blocked: boolean
   }
}

export interface User {
   id: string
   username: string
   email: string
   confirmed: boolean
   blocked: boolean
   createdAt: string
   updatedAt: string
   profileImage?: {
      url: string
   }
}

export type TweetBody = {
   text: string
   likes: number
}

export type CommentBody = {
   comment: string
   likes: number
}
