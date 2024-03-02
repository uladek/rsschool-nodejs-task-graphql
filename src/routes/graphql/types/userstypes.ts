import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { PrismaClient } from "@prisma/client/index.js";
import { PostType } from "./posttypes.js";
import { ProfileType } from "./profiletypes.js";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: UUIDType },
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },

      profile: {
        type: ProfileType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
          const { id } = args;
          const profile = await prisma.profile.findUnique({
            where: { id },
          });

          return profile;
        },
      },

      posts: {
        type: new GraphQLList(PostType),
        resolve: async (_, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
          const { id } = args;

          const posts = await prisma.post.findMany({
            where: { id },
          });
          return posts;
        },
      },

        subscribedToUser: {
          type: new GraphQLList(UserType),
          args: {
            userId: { type: new GraphQLNonNull(UUIDType) },
          },
          resolve: async (_, args: { userId: string }, { prisma }: { prisma: PrismaClient }) => {
            const { userId } = args;
            return prisma.user.findMany({
              where: {
                userSubscribedTo: {
                  some: {
                    authorId: userId,
                  },
                },
              },
            });
          },
        },

        userSubscribedTo: {
          type: new GraphQLList(UserType),
          resolve: async (_, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {

              const { id } = args;
              return prisma.user.findMany({
                  where: {
                      subscribedToUser: {
                          some: {
                              subscriberId: id,
                          },
                      },
                  },


              });
          },
      },



    }),
});
