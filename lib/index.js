/// <reference path="../typings/global.d.ts" />
import { ApolloServer } from 'apollo-server';
import * as cardGql from './gqls/card.gql';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = cardGql;
const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
    {
        title: 'Jerry',
        author: 'Michael Crichton',
    },
    {
        title: 'Jerry xu',
        author: 'Michael Crichton',
    },
];
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (integrationContext) => ({
    // Important: The `integrationContext` argument varies depending
    // on the specific integration (e.g. Express, Koa,  Lambda, etc.)
    // being used. See the table below for specific signatures.
    // For example, using Express's `authorization` header, and a
    // `getScope` method (intentionally left unspecified here):
    // authScope: getScope(integrationContext.req.headers.authorization)
    }),
});
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
