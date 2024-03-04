import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const batchGetUsers = async (ids: string[], prisma: PrismaClient): Promise<User[]> => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });

    const userMap: Record<string, User> = {};
    users.forEach((user) => {
        userMap[user.id] = user;
    });

    return ids.map((id) => userMap[id]);
};

export const userLoader = (prisma: PrismaClient) => new DataLoader(async (ids: readonly string[]) => {
    const idsArray: string[] = ids.map(id => id);
    return batchGetUsers(idsArray, prisma);
});
