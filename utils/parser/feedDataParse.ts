import { Tweet, Comments } from '@/types/typings'

interface TweetData {
   id: string
   attributes: {
      text: string
      blockTweet: boolean
      likes: number
      createdAt: string
      updatedAt: string
      image?: {
         data: {
            id: string
            attributes: {
               url: string
            }
         }
      }
      user: {
         data: {
            id: string
            attributes: {
               username: string
               blocked: boolean
               profileImage: {
                  data: {
                     id: string
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
            id: string
            attributes: {
               comment: string
               blockComment: boolean
               likes: number
               createdAt: string
               updatedAt: string
               user: {
                  data: {
                     id: string
                     attributes: {
                        username: string
                        blocked: boolean
                        profileImage: {
                           data: {
                              id: string
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
   }
}

export function parseTweetData(tweetData: TweetData[]): Tweet[] {
   return tweetData.map((data) => {
      const { id, attributes } = data
      const { text, blockTweet, likes, createdAt, updatedAt } = attributes
      const image = attributes?.image?.data.attributes.url
      const { username, blocked, profileImage } = attributes.user.data.attributes
      const user = { id: attributes.user.data.id, username, blocked, profileImage: profileImage.data.attributes.url }
      const comments: Comments[] = attributes.comments.data.map((commentData) => {
         const { id, attributes } = commentData
         const { comment, blockComment, likes, createdAt, updatedAt } = attributes
         const { username, blocked, profileImage } = attributes.user.data.attributes
         const user = { id: attributes.user.data.id, username, blocked, profileImage: profileImage.data.attributes.url }
         return { id, comment, blockComment, likes, createdAt, updatedAt, user }
      })
      return { id, text, blockTweet, likes, createdAt, updatedAt, image, user, comments }
   })
}
