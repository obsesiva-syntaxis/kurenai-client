//! BASE
import React from 'react';
//! BASE/ROUTER
import { AppRouter } from './routers/AppRouter';

// APOLLO, CONEXIÓN AL BACKEND
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/config';

//REDUX PROVIDER
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

// import './styles/style.css';
import 'animate.css';


export const TattooApp = () => {
    return (
    <ApolloProvider client={ client }>
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    </ApolloProvider>
    );
}
