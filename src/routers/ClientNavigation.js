import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import { map } from 'lodash';
import Auth from '../pages/Auth/Auth';
import Landing from '../pages/Landing';
import Wizard from '../pages/Wizard';
import Records from '../pages/Records';
import Tattoo from '../pages/Tattoo';

export default function ClientNavigation(props) {
    const { auth } = props;
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Auth />
                </Route>
                <Route path="/" render={Landing} exact />
                <Route path="/wizard" render={Wizard} exact />
                <Route path="/records" render={Records} exact />
                <Route path="/tattoo" render={Tattoo} exact />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    )
}
