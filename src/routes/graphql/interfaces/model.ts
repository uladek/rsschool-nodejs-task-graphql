import DataLoader from "dataloader";
import { MemberTypeId as enumMemberTypeId } from "../../member-types/schemas.js";
import { MemberType } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  balance: number;
  subscribedToUser?: SubscriberType[];
  userSubscribedTo?: SubscriberType[];
}


interface SubscriberType {
  authorId: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId?: string;
}

  export interface Profile {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: enumMemberTypeId | string;
}

// mutation

export interface CreateUserInputDTO {
  name: string;
  balance: number;
}

export interface CreatePostInputDTO {
  title: string;
  content: string;
  authorId: string;
}

export interface CreateProfileInputDTO {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId: string;
}


export interface ChangeUserInputDTO {
  name?: string;
  balance?: number;
}

export interface ChangePostInputDTO {
  title: string;
  content: string;
}


export interface ChangeProfileInputDTO {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: enumMemberTypeId | string;
}

// loaders

export interface LoadersType {
  user: DataLoader<string, User>;
  post?: DataLoader<string, Post[]>;
  memberType: DataLoader<string, MemberType | null, string>;
  postByAuthorId: DataLoader<string, Post[]>;
  subscribedToUser: DataLoader<string, User[]>;
}
// export interface SubscriberType {
//   id: string;
//   subscriberId: string;
// }

interface SubscriberType {
  authorId: string;
}
