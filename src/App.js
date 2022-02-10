//! BASE
import React, { useEffect, useState, useMemo } from 'react';

// APOLLO, CONEXIÓN AL BACKEND
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/config';

// //REDUX PROVIDER
// import { Provider } from 'react-redux';
// import { store } from './redux/store/store';

import { getToken, decodeToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routers/Navigation';
import Landing from './pages/Landing';
import ClientNavigation from './routers/ClientNavigation';

//Pages
import Auth from './pages/Auth';

// import './styles/style.css';
import 'animate.css';


export const App = () => {
    const [auth, setAuth] = useState(undefined);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            setAuth(null);
        } else {
            setAuth(decodeToken(token));
        }
    }, []);

    const logout = () => {
        removeToken();
        setAuth(null);
    }

    const setUser = (user) => {
        setAuth(user);
    }

    // const setEvent = (event) => {
    //     setSelectedEvent(event);
    // }

    const authData = useMemo(
        () => ({
            auth,
            logout,
            setUser,
        }),
        [auth]
    );

    if (auth === undefined) return null;

    return (
        <ApolloProvider client={client}>
            <AuthContext.Provider value={authData}>
                {
                    !auth ? <ClientNavigation /> : <Navigation />
                }
            </AuthContext.Provider>
        </ApolloProvider>
    );
}
