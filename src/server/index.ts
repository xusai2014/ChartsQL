import config from './config';
import {ApolloServer} from 'apollo-server-express';
import  express from 'express';
import fs from 'fs';
import path from 'path';
const app = express();
app.get('/front', (req, res) => {
    const filename = path.join(__dirname, '../../dist/index.html');
    fs.readFile(filename, (err, result) => {
      if (err) {
      
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
      return null;
    });
});

app.use('/assets', express.static('dist'));
const server = new ApolloServer(config);
//server.applyMiddleware()
// The `listen` method launches a web server.
server.applyMiddleware({ app,});

// The `listen` method launches a web server.
app.listen({ port: 80 },()=>{
    console.log(`🚀  Server ready at http://localhost/${server.graphqlPath}`,);
})
