import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLEnumType, GraphQLFloat } from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';


export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: GraphQLString },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});


export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
   basic: { value: MemberTypeId.BASIC },
   business: { value: MemberTypeId.BUSINESS },
  },
});