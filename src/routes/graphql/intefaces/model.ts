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
    memberTypeId: string;
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
