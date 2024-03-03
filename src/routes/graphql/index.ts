import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { schemaQuery } from './fields/schemaQuerry.js';
const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

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

      const result = await graphql({
        schema: schemaQuery,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
        }
      });
      if (result === null) {
        throw new Error("GraphQL query returned null");
      }
      console.log("GraphQL query result:", result);

      return result;
    },
  });
};

export default plugin;
