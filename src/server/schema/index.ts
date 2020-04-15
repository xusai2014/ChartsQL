import cardGql from '../../../gqls/card.gql';
import loginGql from '../../../gqls/login.gql';
import queryGql from '../../../gqls/query.gql';
import heatmapGql from '../../../gqls/heatmap.gql';
import {makeExecutableSchema} from 'apollo-server';

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

            const result = await dataSources.loginAPI.getKaptcha();
            return result;
        },
        heatmaps:async (source, args, {dataSources}) => {
            const result = await dataSources.heatmapAPI.getHeatMaps()
            return result;
        },
    },
    Mutation: {
        loginPwd: async (source, args, {dataSources}) => {
            const result = await dataSources.loginAPI.loginWithPwd(args.loginForm)
            return result;
        },
        addHeatMap: async (source, args, {dataSources}) => {
            const result = await dataSources.heatmapAPI.addHeatMap(args.heatMap)
            return result;
        }
    }
};

const GQLSchema = makeExecutableSchema({
    typeDefs: [queryGql, loginGql, cardGql,heatmapGql],
    resolvers,
});
export default GQLSchema
