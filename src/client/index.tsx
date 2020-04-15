import * as React from 'react';
import {render} from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import Routes from './routes';

const client = new ApolloClient({
    uri: '/graphql',
});

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app 🚀</h2>
            <Routes></Routes>
        </div>
    </ApolloProvider>
);

render(<App/>, document.getElementById('root'));
