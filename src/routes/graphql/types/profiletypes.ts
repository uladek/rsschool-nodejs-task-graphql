import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeId } from "./membertypes.js";
import { PrismaClient } from "@prisma/client";
import { LoadersType, Profile } from "../interfaces/model.js";


export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: UUIDType },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        userId: { type: UUIDType },
        memberTypeId: { type: MemberTypeId },

        // memberType: {
        //     type: MemberType,
        //     resolve: async (parent: Profile, _, { prisma }: { prisma: PrismaClient }) => {
        //         const { memberTypeId } = parent;
        //         if (!memberTypeId) {
        //             throw new Error('Missing memberTypeId');
        //         }
        //         const memberType = await prisma.memberType.findUnique({
        //             where: { id: memberTypeId }
        //         });
        //         return memberType;
        //     }
        // },

        memberType: {
            type: MemberType,
            resolve: async (parent: Profile, _, { prisma, loaders }: { prisma: PrismaClient, loaders: LoadersType }) => {
                const { memberTypeId } = parent;
                if (!memberTypeId) {
                    throw new Error('Missing memberTypeId');
                }
                try {
                    const memberType = await loaders.memberType.load(memberTypeId);
                    return memberType || null;
                } catch (error) {
                    console.error("Error fetching member type:", error);
                    return null;
                }
            }
        },

    }),
});

export const CreateProfileInput = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: () => ({
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
        userId: { type: new GraphQLNonNull(UUIDType) },
    }),
});

export const ChangeProfileInput = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: () => ({
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      memberTypeId: { type: MemberTypeId },

    }),
});
