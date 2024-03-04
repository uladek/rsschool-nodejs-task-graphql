import { MemberTypeId as enumMemberTypeId } from "../../member-types/schemas.js";

export interface User {
    id: string;
    name: string;
    balance: number;

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
