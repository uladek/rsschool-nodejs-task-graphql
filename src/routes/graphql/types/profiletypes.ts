import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeIdEnum } from "./membertypes.js";
import { PrismaClient, Profile } from "@prisma/client";

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
    fields: {
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
    },
});
