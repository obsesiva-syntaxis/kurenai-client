import React from 'react';
import Header from '../components/admin/menu/Header';
import Sidebar from '../components/admin/menu/Sidebar';
import { Outlet } from 'react-router-dom';

import './LayoutBasic.scss';

export default function LayoutBasic() {
    return (

        <div className="admin-container">
            <div className="admin-container__sidebar">
                <Sidebar />
            </div>

            <div className="admin-container__main">
                <div className="admin-container__main-header">
                    <Header />
                </div>
                <div className="admin-container__main-body">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}
