//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import { useHistory } from 'react-router';

export const Sidebar = () => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/');
        window.location.reload();
    }

    const handleCalendar = () => {
        history.push('/adm/calendar');
    }
    const handleHome = () => {
        history.push('/adm/home');
    }

    return (
        <div className="sidebar animate__animated animate__fadeInLeft">

            <div className="sidebar__icon-group" onClick={handleHome}>
                <i className="sidebar__icon far fa-comments"></i>
                {/* <span className="sidebar__item">Calendar</span> */}
            </div>

            <div className="sidebar__icon-group" onClick={handleCalendar}>
                <i className="sidebar__icon sidebar__icon-calendar far fa-calendar"></i>
                {/* <span className="sidebar__item">Calendar</span> */}
            </div>



            <div className="sidebar__icon-group-logout">
                <i onClick={logout} className=" rotating sidebar__icon fas fa-power-off" href=""></i>
            </div>
        </div>
    )
}
