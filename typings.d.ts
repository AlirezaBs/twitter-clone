
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
      profileImage: string
   }
   comment?: Comments[]
}

export interface Comments extends CommentBody {
   id: number
   createdAt: string
   updatedAt: string
   blockComment: boolean
   user: {
      id: number
      username: string
      profileImage: string
      blocked: boolean
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
