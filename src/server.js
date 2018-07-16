import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLDefs from './GraphQL';

const typeDefs = GraphQLDefs.schema;

const resolvers = GraphQLDefs.resolvers;

const schema = makeExecutableSchema({ typeDefs, resolvers });
const canAuth = password => password === '279183pB';

const app = express();
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 4000;

const errorMessage = message => `
  {
    "errors": [
      {
        "message": "${message}"
      }
    ]
  }`;

if (process.env.NODE_ENV === 'dev') {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

app.use(cors());

app.use(bodyParser.json());
app.post('*', (req, res, next) => {
  const { query, password } = req.body;
  if (query.indexOf('mutation') !== 0 || canAuth(password)) {
    next();
  } else {
    let err;
    if (!password) {
      err = 'Missing password';
    } else {
      err = 'Password incorrect';
    }
    res.status(403).send(errorMessage(err));
  }
});
app.use('/graphql', graphqlExpress({ schema }));
const server = app.listen(GRAPHQL_PORT, () => console.log('Now browse to localhost:4000/graphiql'));

module.exports = server;
