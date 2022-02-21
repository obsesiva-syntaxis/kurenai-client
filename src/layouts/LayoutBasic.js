import React from 'react';
import Header from '../components/admin/menu/Header';
import Sidebar from '../components/admin/menu/Sidebar';
import { Outlet } from 'react-router-dom';

import './LayoutBasic.scss';

export default function LayoutBasic() {
    return (

        <div className="admin__container">
            <div className="admin__sidebar">
                <Sidebar />
            </div>

            <div className="admin__main">

                <div className="admin__header">
                    <Header />
                </div>
                <div className="admin__body">
                    <Outlet />
                </div>

            </div>
        </div>

    )
}
