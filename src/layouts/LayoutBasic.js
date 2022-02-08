import React from 'react';
import Header from '../components/admin/Menu/Header';
import Sidebar from '../components/admin/Menu/Sidebar';

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
                <div className="admin__body">
                    {children}
                </div>

            </div>
        </div>

    )
}
