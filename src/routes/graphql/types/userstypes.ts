import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { PostType } from "./posttypes.js";
import { ProfileType } from "./profiletypes.js";
import {  LoadersType,  Post,  User } from "../interfaces/model.js";
import { PrismaClient } from "@prisma/client";


export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});


export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});



export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async (parent: User, _, { prisma }: { prisma: PrismaClient }) => {
        const profile = await prisma.profile.findUnique({
          where: { userId: parent.id },
        });

        return profile;
      },
    },

    // posts: {
    //   type: new GraphQLList(PostType),
    //   resolve: async (parent: User, _, { prisma }: { prisma: PrismaClient }) => {
    //     const posts = await prisma.post.findMany({
    //       where: { authorId: parent.id },
    //     });
    //     return posts;
    //   },
    // },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent: User, _, { prisma, loaders }: { prisma: PrismaClient, loaders?: LoadersType }) => {
        try {
          if (!loaders) {
            throw new Error('Loaders are not available');
          }
          // const userPosts: Post[] | null = await loaders.postByAuthorId?.load(parent.id) as Post[] | null;
          const userPosts: Post[] | null = loaders.postByAuthorId ? await loaders.postByAuthorId.load(parent.id) : null;
          return userPosts || [];
        } catch (error) {
          console.error("Error fetching user posts:", error);
          return null;
        }
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent: User, _, { prisma }: { prisma: PrismaClient }) => {
        const subscribedToUsers = await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: parent.id,
              },
            },
          },
        });
        return subscribedToUsers;
      },
    },


  // subscribedToUser: {
  //   type: new GraphQLList(UserType),
  //   resolve: async (parent: User, _, { prisma, loaders }: { prisma: PrismaClient, loaders?: LoadersType }) => {
  //     try {
  //       if (!loaders) {
  //         throw new Error('Loaders are not available');
  //       }
  //       const subscribedToUsers = await loaders.user.load(parent.id);
  //       return subscribedToUsers?.subscribedToUser || [];
  //     } catch (error) {
  //       console.error("Error fetching subscribed users:", error);
  //       return null;
  //     }
  //   },
  // },


      userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: async (parent: User, _, { prisma }: { prisma: PrismaClient }) => {

          const userSubscribedTo = await prisma.user.findMany({
            where: {
              subscribedToUser: {
              some: {
                  subscriberId: parent.id,
                },
              },
            },
          });
          return userSubscribedTo;
        },
      },

  // userSubscribedTo: {
  //   type: new GraphQLList(UserType),

  //   resolve: async (parent: User, _, { prisma, loaders }: { prisma: PrismaClient, loaders?: LoadersType }) => {
  //     try {
  //       if (!loaders) {
  //         throw new Error('Loaders are not available');
  //       }
  //       const userSubscribedTo = await loaders.user.load(parent.id);
  //       return userSubscribedTo?.userSubscribedTo || [];
  //     } catch (error) {
  //       console.error("Error fetching users subscribed to:", error);
  //       return null;
  //     }
  //   },
  // },

  }),
});
