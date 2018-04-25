import fs from 'fs';
import path from 'path';
import _config from '../config.json';
import ProjectResolver from './model/Project';
import ProjectTypeResolver from './model/ProjectType';

const config = _config[process.env.NODE_ENV];

const resolvers = {
  Query: { ...ProjectResolver.Query, ...ProjectTypeResolver.Query },
  Mutation: { ...ProjectResolver.Mutation, ...ProjectTypeResolver.Mutation },
};

export default {
  schema: fs.readFileSync(path.join(__dirname, config.database.schema), { encoding: 'utf8' }),
  resolvers,
};
