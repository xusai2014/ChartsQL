import 'graphql-import-node';
import {ApolloServer} from 'apollo-server-express';
import {LoginAPI} from "./dataSource";
import GQLSchema from "./schema";

const server = new ApolloServer({
    schema: GQLSchema,
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
    context: (integrationContext) => ({
        // Important: The `integrationContext` argument varies depending
        // on the specific integration (e.g. Express, Koa,  Lambda, etc.)
        // being used. See the table below for specific signatures.
    }),
    tracing: true,
});
export default server;
