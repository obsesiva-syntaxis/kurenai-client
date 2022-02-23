import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context'

const httpLink = createUploadLink({
    // uri: 'http://localhost:4000/graphql',
    uri: 'https://kurenai-server-app.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            auth: token ? `Bearer ${token}` : ''
        }
    }
});

export const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink )
});