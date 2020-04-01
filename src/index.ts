import 'graphql-import-node';
import {ApolloServer,makeExecutableSchema} from 'apollo-server';
import cardGql from '../gqls/card.gql';
import loginGql from '../gqls/login.gql';
import queryGql from '../gqls/query.gql';
import {LoginAPI} from "./dataSource";


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

const resolvers = {
    Query: {
        books: () => books,
        imgUrl: async (_source, _args, {dataSources}) => {
            const result =  await dataSources.loginAPI.getKaptcha();

            return result;
        }
    },
};


const server = new ApolloServer({
    schema:makeExecutableSchema({
        typeDefs: [queryGql, loginGql, cardGql ],
        resolvers,
    }),
    formatError: (err) => {
        // Don't give the specific errors to the client.
        if (err.message.startsWith("Database Error: ")) {
            return new Error('Internal server error');
        }
        return err;
    },
    introspection: true,
    dataSources: () => ({
        loginAPI: new LoginAPI(),
    }),
    onHealthCheck:()=>(new Promise(()=>{})),
    context: (integrationContext) => ({
      // Important: The `integrationContext` argument varies depending
      // on the specific integration (e.g. Express, Koa,  Lambda, etc.)
      // being used. See the table below for specific signatures.


        "Content-Type": "application/json"

    }),

});

// The `listen` method launches a web server.
server.listen().then(({url,...rest}) => {
    console.log(`🚀  Server ready at ${url}`,);
});
