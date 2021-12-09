//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'

import { useApolloClient } from '@apollo/client';
import useAuth from '../../../../hooks/useAuth';

import './Sidebar.scss';

export default function Sidebar() {

    const client = useApolloClient();
    const { logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        client.clearStore();
        logout();
        history.push('/');
    }

    // const handleCalendar = () => {
    //     history.push('/adm/calendar');
    // }
    // const handleHome = () => {
    //     history.push('/adm/home');
    // }

    return (
        <div className="sidebar animate__animated animate__fadeInLeft">

            <div className="sidebar__icon-group">

                <Link to='/'>
                    <i className="sidebar__icon far fa-comments"></i>
                </Link>
                {/* <span className="sidebar__item">Calendar</span> */}
            </div>

            <div className="sidebar__icon-group">
                <Link to='/calendar'>
                    <i className="sidebar__icon sidebar__icon-calendar far fa-calendar"></i>
                </Link>
                {/* <span className="sidebar__item">Calendar</span> */}
            </div>



            <div className="sidebar__icon-group-logout">
                <i onClick={handleLogout} className=" rotating sidebar__icon fas fa-power-off" href=""></i>
            </div>
        </div>
    )
}
