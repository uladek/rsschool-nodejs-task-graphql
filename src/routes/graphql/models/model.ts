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
