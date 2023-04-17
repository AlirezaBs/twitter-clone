import { Tweet, Comments, Likes } from "@/types/typings"

interface TweetData {
   id: number
   attributes: {
      text: string
      blockTweet: boolean
      createdAt: string
      updatedAt: string
      image?: {
         data: {
            id: string
            attributes: {
               url: string
            }
         }
      } | null
      user: {
         data: {
            id: number
            attributes: {
               username: string
               blocked: boolean
               profileImage?: {
                  data: {
                     id: number
                     attributes: {
                        url: string
                     }
                  }
               }
            }
         }
      }
      comments: {
         data: {
            id: number
            attributes: {
               comment: string
               blockComment: boolean
               createdAt: string
               updatedAt: string
               user: {
                  data: {
                     id: number
                     attributes: {
                        username: string
                        blocked: boolean
                        profileImage?: {
                           data: {
                              id: number
                              attributes: {
                                 url: string
                              }
                           }
                        }
                     }
                  }
               }
            }
         }[]
      }
      likes: {
         data: {
            id: number
            attributes: {
               username: string
            }
         }[]
      }
   }
}

export function parseTweetData(tweetData: TweetData[]): Tweet[] {
   return tweetData.map((data) => {
      const { id, attributes } = data
      const { text, blockTweet, createdAt, updatedAt } = attributes

      const image = attributes?.image?.data
         ? attributes.image.data.attributes.url
         : ""

      const { username, blocked } = attributes.user.data.attributes

      const profileImage = attributes?.user?.data?.attributes?.profileImage
         ?.data?.attributes?.url
         ? attributes.user.data.attributes.profileImage.data.attributes.url
         : null

      const user = {
         id: attributes.user.data.id,
         username,
         blocked,
         profileImage,
      }

      const likes: Likes[] = attributes.likes?.data.map((likeData) => {
         const username = likeData.attributes.username
         return {
            username,
         }
      })

      const comments: Comments[] = attributes.comments.data.map(
         (commentData) => {
            const { id, attributes } = commentData
            const { comment, blockComment, createdAt, updatedAt } = attributes

            const { username, blocked } = attributes.user.data.attributes
            const profileImage = attributes?.user?.data?.attributes
               ?.profileImage?.data?.attributes?.url
               ? attributes.user.data.attributes.profileImage.data.attributes
                    .url
               : null
            const user = {
               id: attributes.user.data.id,
               username,
               blocked,
               profileImage,
            }
            return {
               id,
               comment,
               blockComment,
               createdAt,
               updatedAt,
               user,
            }
         }
      )

      return {
         id,
         text,
         blockTweet,
         createdAt,
         updatedAt,
         image,
         user,
         comments,
         likes,
      }
   })
}
