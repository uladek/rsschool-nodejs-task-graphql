import { GraphQLNonNull } from "graphql";
import { CreatePostInput, PostType } from "../types/posttypes.js";
import { CreateUserInput, UserType } from "../types/userstypes.js";
import { PrismaClient } from "@prisma/client";
import { CreateProfileInput, ProfileType } from "../types/profiletypes.js";
import { CreatePostInputDTO, CreateProfileInputDTO, CreateUserInputDTO } from "../intefaces/model.js";



export const mutationFields = {
      createUser: {
        type: UserType,
        args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
        },
        resolve: async (_, { dto }: {dto: CreateUserInputDTO }, { prisma }: { prisma: PrismaClient }) => {
          // const { name, balance } = input as { name: string, balance: number };
          const newUser = await prisma.user.create({
            data: dto
          });
          return newUser;
        },
      },


      createPost: {
        type: PostType,
        args: {
          dto: { type: new GraphQLNonNull(CreatePostInput) },
        },
        resolve: async (_, { dto }: { dto: CreatePostInputDTO }, { prisma }: { prisma: PrismaClient }) => {
          const newPost = await prisma.post.create({
            data: dto
          });
          return newPost;
        },
      },


      createProfile: {
        type: ProfileType,
        args: {
          dto: { type: new GraphQLNonNull(CreateProfileInput) },
        },

        resolve: async (_, { dto } : {dto: CreateProfileInputDTO}, { prisma }: { prisma: PrismaClient }) => {
          // const { isMale, yearOfBirth, memberTypeId, userId } = input as { isMale: boolean, yearOfBirth: number, memberTypeId: string, userId: string  };
          const newProfile = await prisma.profile.create({
            data: dto
          });
          return newProfile;
        },
      },
  };
