import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import { map } from 'lodash';
import Auth from '../pages/Auth/Auth';
import Landing from '../pages/Landing';

export default function Navigation() {
    return (
        <Router>
            <Switch>
                {
                    map(routes, (route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={(props) => (
                                <route.layout>
                                    <route.component {...props} />
                                </route.layout>
                            )}
                        />
                    ))
                }
            </Switch>
        </Router>
    )
}
