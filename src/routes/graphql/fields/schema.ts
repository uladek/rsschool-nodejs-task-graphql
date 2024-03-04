import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { queryFields } from "./schemaQuerry.js";
import { mutationFields } from "./schemaMutation.js";


export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: queryFields,
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: mutationFields,
    }),
  });
