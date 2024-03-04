import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLEnumType, GraphQLFloat } from 'graphql';
import { MemberTypeId as enumMemberTypeId } from '../../member-types/schemas.js';


export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: GraphQLString },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});


export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: enumMemberTypeId.BASIC },
    business: { value: enumMemberTypeId.BUSINESS },
  },
});
