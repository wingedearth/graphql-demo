// Import some libraries
var graphql     = require('graphql');
var graphqlHttp = require('express-graphql');
var express     = require('express');

// Import some data
var data        = require('./data.json');

/* Define a User type with 'id' and 'name' keys
This will be a GraphQLObjectType which has child fields
with their own types (in this case, GraphQLString) */

var userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
});

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,

        // define arguments that 'user' query accepts
        args: {
          id: { type: graphql.GraphQLString }
        },

// And how shall we 'resolve' the income query, eh?
// How about using the 'id' argument as a key to get the User?
        resolve: function(_, args) {
          return data[args.id];
        }
      }
    }
  })
});

express()
  .use('/graphql', graphqlHttp({
    schema: schema,
    pretty: true
  }))
  .listen(3000);

console.log('A warlock has conjured a GraphQL server at http://localhost:3000/graphql');


