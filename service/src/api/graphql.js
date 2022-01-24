import fs from 'fs';
import path from 'path';
import { GraphQLScalarType, Kind } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import ProjectResolvers from './Project';
import ImageResolvers from './Image';
import ProjectTypeResolvers from './ProjectType';
import SectionResolvers from './Section';

const resolvers = [
  ProjectResolvers,
  ImageResolvers,
  ProjectTypeResolvers,
  SectionResolvers,
];


const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.toISOString().split('T')[0]; // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert hard-coded AST string to Date
    }
    return null; // Invalid hard-coded value (not a string)
  },
});

module.exports = makeExecutableSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, '../../docs/api.graphql'), 'utf-8'),
  resolvers: {
    Date: dateScalar,
    Query: {
      ...resolvers.reduce((acc, resolver) => {
        return {
          ...acc,
          ...resolver.Query
        }
      }, {})
    },
    Mutation: {
      ...resolvers.reduce((acc, resolver) => {
        return {
          ...acc,
          ...resolver.Mutation
        }
      }, {})
    },
    Project: ProjectResolvers.Project,
  },
});
