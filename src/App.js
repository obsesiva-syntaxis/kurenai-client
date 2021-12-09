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
import { ToastContainer } from 'react-toastify';

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
                    !auth ? <Auth /> : <Navigation />
                }
            </AuthContext.Provider>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOntop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                Draggable
                pauseOnHover
            />

            {/* <Provider store={ store }> */}
            {/* <AppRouter /> */}
            {/* </Provider> */}
        </ApolloProvider>
    );
}
