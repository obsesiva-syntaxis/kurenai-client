//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'

import { useApolloClient } from '@apollo/client';
import useAuth from '../../../../hooks/useAuth';

import './Sidebar.scss';

export default function Sidebar() {

    const client = useApolloClient();
    const { logout, auth } = useAuth();
    const navigate  = useNavigate();

    const handleLogout = () => {
        client.clearStore();
        logout();
        navigate('/');
    }

    // const handleCalendar = () => {
    //     history.push('/adm/calendar');
    // }
    // const handleHome = () => {
    //     history.push('/adm/home');
    // }


    return (
        <div className="sidebar">

            <div className="sidebar__icon-group">
                <Link to='/admin'>
                    <i className="sidebar__icon fas fa-home"></i>
                </Link>
            </div>

            <div className="sidebar__icon-group">
                <Link to='/admin/calendar'>
                    <i className="sidebar__icon sidebar__icon-calendar fas fa-calendar"></i>
                </Link>
            </div>

            <div className="sidebar__icon-group">
                <Link to='/admin/request'>
                    <i className="sidebar__icon fas fa-handshake"></i>
                </Link>
            </div>
            <div className="sidebar__icon-group">
                <Link to='/admin/billing'>
                <i className="sidebar__icon fas fa-balance-scale"></i>
                </Link>
            </div>
            {
                auth.type === 'overlord' && (
                    <div className="sidebar__icon-group">
                        <Link to='/admin/user'>
                            <i className="sidebar__icon  fas fa-users"></i>
                            {/* <i className="sidebar__icon sidebar__icon-calendar far fa-calendar"></i> */}
                        </Link>
                    </div>
                )
            }



            <div className="sidebar__icon-group-logout">
                <i onClick={handleLogout} className="sidebar__icon fas fa-power-off" href=""></i>
            </div>
        </div>
    )
}
