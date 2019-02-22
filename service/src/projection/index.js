import gqlProjection from 'graphql-advanced-projection';

const Projection = gqlProjection({
  Project: {
    id: '_id'
  },
  Image: {
    id: '_id'
  },
  ProjectType: {
    id: '_id'
  },
  Section: {
    id: '_id'
  },

});

export const project = Projection.project;
export const resolvers = Projection.resolvers;
