import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import { map } from 'lodash';

export default function Navigation(props) {
    const { auth } = props;
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
                {
                    auth ? (
                            <Route render={() => <Redirect to="/" />} />
                        ):(
                            <Route render={() => <Redirect to="/admin" />} />
                    )
                }
            </Switch>
        </Router>
    )
}
