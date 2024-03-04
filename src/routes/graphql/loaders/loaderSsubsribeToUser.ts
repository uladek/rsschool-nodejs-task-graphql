
import DataLoader from 'dataloader';
import { PrismaClient, User } from '@prisma/client';

const batchGetSubscribedToUsers = async (ids: string[], prisma: PrismaClient): Promise<User[][]> => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: ids,
            },
        },
        include: {
            subscribedToUser: true,
        },
    });

    const userMap: Record<string, User[]> = {};
    users.forEach((user) => {
        user.subscribedToUser.forEach((subscribedUser) => {
            const subscribedUserId = subscribedUser.authorId;
            if (!userMap[subscribedUserId]) {
                userMap[subscribedUserId] = [];
            }
            userMap[subscribedUserId].push(user);
        });
    });

    return ids.map((id) => userMap[id] || []);
};

export const subscribedToUserLoader = (prisma: PrismaClient) => new DataLoader(async (ids: readonly string[]) => {
    const uniqueIds: string[] = Array.from(new Set(ids));

    return batchGetSubscribedToUsers(uniqueIds, prisma);
});
