import 'graphql-import-node';
import {LoginAPI} from "./dataSource";
import GQLSchema from "./schema";
import HeatMapData from './dataSource/heatmap'
import { MongoClient } from 'mongodb';
const client = new MongoClient('mongodb://localhost:27017/test',
    { useNewUrlParser: true, useUnifiedTopology: true })
client.connect()

export default {
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
        heatmapAPI:new HeatMapData(client.db().collection('heatmap'))
    }),
    context: (integrationContext) => ({
        // Important: The `integrationContext` argument varies depending
        // on the specific integration (e.g. Express, Koa,  Lambda, etc.)
        // being used. See the table below for specific signatures.
    }),
    tracing: true,
}