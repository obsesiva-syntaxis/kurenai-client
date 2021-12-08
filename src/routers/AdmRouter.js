//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Components
import { AdmCalendar } from '../components/admin/AdmCalendar';
import { EditEvent } from '../components/admin/calendar/EditEvent';
import { NewEvent } from '../components/admin/calendar/NewEvent';
import { Header } from '../components/admin/menu/Header';
import { Sidebar } from '../components/admin/menu/Sidebar';
import { AdmHome } from '../components/admin/AdmHome';

export const AdmRouter = () => {
    return (
        <Router>
            <div className="admin__container">
                <div className="admin__sidebar">
                    <Sidebar />
                </div>

                <div className="admin__main">

                    <div className="admin__header">
                        <Header />
                    </div>
                    <div className="admin__body animate__animated animate__fadeIn">
                        <Switch>
                            <Route path="/adm/home" component={AdmHome} />
                            <Route path="/adm/calendar" component={AdmCalendar} />
                            <Route path="/adm/newevent" component={NewEvent} />
                            <Route path="/adm/editevent" component={EditEvent} />       
                        </Switch>
                    </div>

                </div>
            </div>
        </Router>
    )
}
