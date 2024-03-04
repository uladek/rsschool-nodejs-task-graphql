import { PrismaClient, MemberType } from '@prisma/client';
import DataLoader from 'dataloader';

export const batchGetMemberTypes = async (ids: string[], prisma: PrismaClient): Promise<MemberType[]> => {
    const memberTypes = await prisma.memberType.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });

    return ids.map(id => {
        const foundMemberType = memberTypes.find(memberType => memberType.id === id);
        if (foundMemberType) {
            return foundMemberType;
        } else {
            throw new Error(`MemberType with id ${id} not found`);
        }
    });
};

export const memberTypeLoader = (prisma: PrismaClient) => new DataLoader(async (ids: readonly string[]) => {
    const idsArray: string[] = ids as string[];
    return batchGetMemberTypes(idsArray, prisma);
});



// export const memberTypeLoader = (prisma: PrismaClient) => new DataLoader(async (ids: readonly string[]) => {
//     const uniqueIds: string[] = Array.from(new Set(ids));
//     const memberTypes = await prisma.memberType.findMany({
//         where: {
//             id: {
//                 in: uniqueIds,
//             },
//         },
//     });

//     const memberTypeMap: Record<string, MemberType> = {};
//     memberTypes.forEach((memberType) => {
//         memberTypeMap[memberType.id] = memberType;
//     });

//     return ids.map((id) => memberTypeMap[id] || null);
// });
