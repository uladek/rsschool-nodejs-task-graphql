import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { PrismaClient } from "@prisma/client/index.js";
import { PostType } from "./posttypes.js";
import { ProfileType } from "./profiletypes.js";
import { User } from "../intefaces/model.js";


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
                authorId: parent.id,
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
