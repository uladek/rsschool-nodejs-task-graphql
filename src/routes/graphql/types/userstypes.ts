import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { PrismaClient, User } from "@prisma/client/index.js";
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
      resolve: async (parent: User, _, { prisma }: { prisma: PrismaClient }) => {
        const profile = await prisma.profile.findUnique({
          where: { id: parent.id },
        });

        return profile;
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent: User, _, { prisma }: { prisma: PrismaClient }) => {
        const posts = await prisma.post.findMany({
          where: { authorId: parent.id },
        });
        return posts;
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent: User, _, { prisma }: { prisma: PrismaClient }) => {
        const subscribedToUsers = await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                subscriberId: parent.id,
              },
            },
          },
        });
        return subscribedToUsers;
      },
    },

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

  }),
});
