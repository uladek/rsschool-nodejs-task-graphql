import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeId } from "./membertypes.js";
import { PrismaClient } from "@prisma/client";
import { Profile } from "../interfaces/model.js";


export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: UUIDType },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        userId: { type: UUIDType },
        memberTypeId: { type: MemberTypeId },

        memberType: {
            type: MemberType,
            resolve: async (parent: Profile, _, { prisma }: { prisma: PrismaClient }) => {
                const { memberTypeId } = parent;
                if (!memberTypeId) {
                    throw new Error('Missing memberTypeId');
                }
                const memberType = await prisma.memberType.findUnique({
                    where: { id: memberTypeId }
                });
                return memberType;
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
