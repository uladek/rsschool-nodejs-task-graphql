import { PrismaClient, Post } from '@prisma/client';
import DataLoader from 'dataloader';

export const batchGetPostsByAuthorIds = async (authorIds: string[], prisma: PrismaClient): Promise<Array<Post[]>> => {
    const posts = await prisma.post.findMany({
        where: {
            authorId: {
                in: authorIds,
            },
        },
    });

    const postsByAuthor: Record<string, Post[]> = {};
    posts.forEach(post => {
        if (!postsByAuthor[post.authorId]) {
            postsByAuthor[post.authorId] = [];
        }
        postsByAuthor[post.authorId].push(post);
    });

    return authorIds.map(authorId => postsByAuthor[authorId] || []);
};

export const postLoaderByAuthorId = (prisma: PrismaClient) => new DataLoader(async (authorIds: readonly string[]) => {
    const uniqueAuthorIds = Array.from(new Set(authorIds));
    return batchGetPostsByAuthorIds(uniqueAuthorIds, prisma);
});




// export const batchGetPosts = async (ids: string[], prisma: PrismaClient): Promise<Post[][]> => {
//     const posts = await prisma.post.findMany({
//         where: {
//             id: {
//                 in: ids,
//             },
//         },
//     });

//     const postMap: Record<string, Post[]> = {};
//     posts.forEach((post) => {
//         if (!postMap[post.authorId]) {
//             postMap[post.authorId] = [];
//         }
//         postMap[post.authorId].push(post);
//     });

//     return ids.map((id) => postMap[id] || []);
// };

// export const postLoader = (prisma: PrismaClient) => new DataLoader(async (ids: readonly string[]) => {
//     const uniqueIds: string[] = Array.from(new Set(ids));

//     return batchGetPosts(uniqueIds, prisma);
// });
