import React from 'react';
import Header from '../components/admin/menu/Header';
import Sidebar from '../components/admin/menu/Sidebar';

import './LayoutBasic.scss';

export default function LayoutBasic(props) {
    const { children } = props;
    return (

        <div className="admin__container">
            <div className="admin__sidebar">
                <Sidebar />
            </div>

            <div className="admin__main">

                <div className="admin__header">
                    <Header />
                </div>
                <div className="admin__body animate__animated animate__fadeIn">
                    {/* <Switch>
                        <Route path="/adm/home" component={AdmHome} />
                        <Route path="/adm/calendar" component={AdmCalendar} />
                        <Route path="/adm/newevent" component={NewEvent} />
                        <Route path="/adm/editevent" component={EditEvent} />
                    </Switch> */}
                    {children}
                </div>

            </div>
        </div>

    )
}
