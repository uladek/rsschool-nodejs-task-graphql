import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeIdEnum } from "./membertypes.js";
import { PrismaClient } from "@prisma/client";
import { Profile } from "../intefaces/model.js";


// export const ProfileType = new GraphQLObjectType({
//     name: 'Profile',
//     fields: {
//       id: { type: UUIDType },
//       isMale: { type: GraphQLBoolean },
//       yearOfBirth: { type: GraphQLInt },
//       userId: { type: UUIDType },
//       // ??
//       // memberTypeId: { type: MemberTypeIdEnum },
//       memberTypeId: { type: GraphQLString },

//       memberType: {
//         type: MemberType,
//         args: {
//             id: { type: new GraphQLNonNull(MemberTypeIdEnum) }
//         },
//         resolve: async (_, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
//         const { id } = args;
//         const memberType = await prisma.memberType.findUnique({
//             where: {
//             id
//             }
//         });

//         return memberType;
//         }
//     },
//     },
//   });

export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: UUIDType },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        userId: { type: UUIDType },
        memberTypeId: { type: MemberTypeIdEnum },
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
        memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    }),
});
