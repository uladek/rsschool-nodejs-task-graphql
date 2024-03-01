import { GraphQLObjectType, GraphQLString } from 'graphql';


export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLString  },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});
