//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

//! COMPONENTS
import { LoginScreen } from '../components/login/LoginScreen';
import { AdmRouter } from '../routers/AdmRouter';


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ LoginScreen } />
                    <Route path="/adm" component={ AdmRouter } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
