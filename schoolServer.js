let express = require('express');
let bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./components/resolvers');
const schemas = require('./components/schemas');
const app = express();



const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    formatError: error => {
      console.log(error);
      return error;
    },
    formatResponse: response => {
      console.log(response);
      return response;
    },
  });
  
  server.applyMiddleware({ app, path: '/graphql' });
  
  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
  
  
  //Run app, then load http://localhost:port in a browser to see the output.