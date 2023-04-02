import { User } from "@/types/typings"

export function parseUsersList(data: any[]): User[] {
   return data.map((item) => ({
      id: item.id.toString(),
      username: item.username,
      about: item.about ? item.about : null,
      email: item.email,
      confirmed: item.confirmed,
      blocked: item.blocked,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      profileImage: item.profileImage ? item.profileImage.url : null,
   }))
}

export function parseUsers(data: any): User {
   return {
      id: data.id.toString(),
      username: data.username,
      about: data.about ? data.about : null,
      email: data.email,
      confirmed: data.confirmed,
      blocked: data.blocked,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      profileImage: data.profileImage ? data.profileImage.url : null,
   }
}
