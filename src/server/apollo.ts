import config from './config';
import {ApolloServer} from 'apollo-server-express';

const server = new ApolloServer(config);
export default server;
