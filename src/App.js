//! BASE
import React, { useEffect, useState, useMemo } from 'react';

// APOLLO, CONEXIÓN AL BACKEND
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/config';


import { getToken, decodeToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routers/Navigation';
import ClientNavigation from './routers/ClientNavigation';
import moment from 'moment';

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
            if(moment(decodeToken(token).exp * 1000).format() < moment().format()){
                setAuth(null);
            } else {
                setAuth(decodeToken(token));
            }
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
                    !auth ? <ClientNavigation /> : <Navigation auth={ auth } />
                }
            </AuthContext.Provider>
        </ApolloProvider>
    );
}
