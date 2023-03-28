import { User } from "@/types/typings";

export function parseUsers(data: any[]): User[] {
    return data.map((item) => ({
      id: item.id.toString(),
      username: item.username,
      email: item.email,
      confirmed: item.confirmed,
      blocked: item.blocked,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      profileImage: item.profileImage ? { url: item.profileImage.url } : undefined,
    }));
  }