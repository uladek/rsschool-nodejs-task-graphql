import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './fields/schema.js';
import  depthLimit from 'graphql-depth-limit';
import { memberTypeLoader } from './loaders/loaderMemberTypes.js';
import { userLoader } from './loaders/loaderUser.js';
import { postLoaderByAuthorId } from './loaders/loaderPost.js';
import { subscribedToUserLoader } from './loaders/loaderSsubsribeToUser.js';


const depthLength = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  const loaders = {
    user: userLoader(prisma),
    memberType: memberTypeLoader(prisma),
    postByAuthorId: postLoaderByAuthorId(prisma),
    subscribedToUserLoader: subscribedToUserLoader(prisma),
};

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {

      const { query, variables } = req.body;


      const validationErrors = validate(schema, parse(query), [
        depthLimit(depthLength),
      ]);

      if (validationErrors && validationErrors.length > 0) {
        return { errors: validationErrors};
      }

      const result = await graphql({
        schema: schema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
          loaders

        },

      });


      if (result === null) {
        throw new Error("GraphQL query returned null");
      }
      // console.log("GraphQL query result:", result);

      return result;
    },
  });
};

export default plugin;
