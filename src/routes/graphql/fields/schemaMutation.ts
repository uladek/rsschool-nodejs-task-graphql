import { GraphQLBoolean, GraphQLNonNull } from "graphql";
import { ChangePostInput, CreatePostInput, PostType } from "../types/posttypes.js";
import { ChangeUserInput, CreateUserInput, UserType } from "../types/userstypes.js";
import { PrismaClient } from "@prisma/client";
import { ChangeProfileInput, CreateProfileInput, ProfileType } from "../types/profiletypes.js";
import {
   ChangePostInputDTO,
   ChangeProfileInputDTO,
   ChangeUserInputDTO,
   CreatePostInputDTO,
   CreateProfileInputDTO,
   CreateUserInputDTO
  } from "../intefaces/model.js";
import { UUIDType } from "../types/uuid.js";



export const mutationFields = {
      createUser: {
        type: UserType,
        args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
        },
        resolve: async (_, { dto }: {dto: CreateUserInputDTO }, { prisma }: { prisma: PrismaClient }) => {
          const newUser = await prisma.user.create({
            data: dto
          });
          return newUser;
        },
      },

      changeUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(ChangeUserInput) },
        },
        resolve: async (_, { id, dto }: { id: string, dto: ChangeUserInputDTO  }, { prisma }: { prisma: PrismaClient }) => {
          const updatedUser = await prisma.user.update({
            where: { id },
            data: dto,
          });
          return updatedUser;
        },
      },

      deleteUser: {
        type: GraphQLBoolean,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
          await prisma.user.delete({ where: { id } });
          return null;
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


      changePost: {
        type: PostType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(ChangePostInput) },
        },
        resolve: async (_, { id, dto }: { id: string, dto: ChangePostInputDTO }, { prisma }: { prisma: PrismaClient }) => {
          const updatedPost = await prisma.post.update({
            where: { id },
            data: dto,
          });
          return updatedPost;
        },
      },

      deletePost: {
        type: GraphQLBoolean,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
          await prisma.post.delete({ where: { id } });
          return null;
        },
      },



      createProfile: {
        type: ProfileType,
        args: {
          dto: { type: new GraphQLNonNull(CreateProfileInput) },
        },

        resolve: async (_, { dto } : {dto: CreateProfileInputDTO}, { prisma }: { prisma: PrismaClient }) => {
          const newProfile = await prisma.profile.create({
            data: dto
          });
          return newProfile;
        },
      },


    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },

        dto: { type: new GraphQLNonNull(ChangeProfileInput) },

      },

      resolve: async (_, { id, dto }: { id: string, dto: ChangeProfileInputDTO }, { prisma }: { prisma: PrismaClient }) => {
        const updatedProfile = await prisma.profile.update({
          where: { id },
          data: dto,
        });
        return updatedProfile;
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
        await prisma.profile.delete({ where: { id } });
        return null;
      },
    },


  };
