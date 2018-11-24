import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'babel-polyfill';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import schema from './api/graphql';
import dbConfig from './config/dbConfig';
import serverConfig from './config/serverConfig';

dbConfig.init(serverConfig);

const app = express();
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 4000;

if (process.env.NODE_ENV === 'dev') {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

app.use(cors());

app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({ schema }));

const server = app.listen(GRAPHQL_PORT, () => console.log('Now browse to localhost:4000/graphiql'));

module.exports = server;
