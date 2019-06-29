import fs from 'fs';
import path from 'path';
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

module.exports = makeExecutableSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, '../../docs/api.graphql'), 'utf-8'),
  resolvers: {
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
