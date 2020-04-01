"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
var apollo_server_1 = require("apollo-server");
var card_gql_1 = __importDefault(require("../gqls/card.gql"));
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var typeDefs = card_gql_1.default;
var books = [
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
var resolvers = {
    Query: {
        books: function () { return books; },
    },
};
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: function (integrationContext) { return ({
    // Important: The `integrationContext` argument varies depending
    // on the specific integration (e.g. Express, Koa,  Lambda, etc.)
    // being used. See the table below for specific signatures.
    // For example, using Express's `authorization` header, and a
    // `getScope` method (intentionally left unspecified here):
    // authScope: getScope(integrationContext.req.headers.authorization)
    }); },
});
// The `listen` method launches a web server.
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
