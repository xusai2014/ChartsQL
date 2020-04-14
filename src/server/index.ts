import config from './config';
import {ApolloServer} from 'apollo-server-express';
import  express from 'express';
const app = express();
app.get('/front', (req, res) => {
  
});
const server = new ApolloServer(config);

//server.applyMiddleware()

// The `listen` method launches a web server.
server.applyMiddleware({ app,});

// The `listen` method launches a web server.
app.listen({ port: 80 },()=>{
    console.log(`🚀  Server ready at http://localhost/${server.graphqlPath}`,);
})
