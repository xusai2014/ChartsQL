import * as React from 'react';
import {render} from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import Books from './pages/books';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app 🚀</h2>
            <Books></Books>
        </div>
    </ApolloProvider>
);

render(<App/>, document.getElementById('root'));
