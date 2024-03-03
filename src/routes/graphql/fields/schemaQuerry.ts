import { GraphQLList, GraphQLNonNull } from "graphql";
import { MemberType, MemberTypeIdEnum } from "../types/membertypes.js";
import { PostType } from "../types/posttypes.js";
import { UUIDType } from "../types/uuid.js";
import { UserType } from "../types/userstypes.js";
import { ProfileType } from "../types/profiletypes.js";
import { PrismaClient } from "@prisma/client";


export const queryFields = {
        memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {

            const memberTypes =  await prisma.memberType.findMany();
            return memberTypes;
            },
        },

        memberType: {
            type: MemberType,
            args: {
                id: { type: new GraphQLNonNull(MemberTypeIdEnum) }
            },
            resolve: async (_, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
            const { id } = args;
            const memberType = await prisma.memberType.findUnique({
                where: {
                id
                }
            });

            return memberType;
            }
        },


        posts: {
            type: new GraphQLList(PostType),
            resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {
            const posts = await prisma.post.findMany();
            return posts;
            },
            },


        post: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },

            resolve: async (_, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {

            const { id } = args;
            const post = await prisma.post.findUnique({
                where: { id },
            });

                return post;
            },
        },


        users: {
            type: new GraphQLList(UserType),
            resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {

            const users = await prisma.user.findMany();

            return users;
            },
        },


        user: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
                try {
                    const { id } = args;
                    const user = await prisma.user.findUnique({ where: { id } });
                    return user || null;
                } catch (error) {
                    console.error("Error fetching user:", error);
                    return null;
                }
            },
        },



        profiles: {
            type: new GraphQLList(ProfileType),
            resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {
            const profiles = await prisma.profile.findMany();

            return profiles;
            },
        },


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
};
