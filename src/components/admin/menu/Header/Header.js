//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useQuery } from '@apollo/client';
import { GET_USER_AUTH } from '../../../../graphql/GET_USER_AUTH';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import { useHistory } from 'react-router-dom';

import './Header.scss';

export default function Header(){

    const history = useHistory();

    //llamada a la base de datos
    const { data, loading } = useQuery(GET_USER_AUTH);
    if (loading) return null;

    if (data.getUserAuth === null) {
        history.push('/');
        window.location.reload();
    }

    const { name, email, avatarUrl } = data.getUserAuth;

    return (
        <div className="header">

            <div className="header__primary">

                <div className="header__primary-avatar">
                    <img className="header__primary-avatar-img" src={avatarUrl} alt="" />
                </div>

                <div className="header__primary-info animate__animated animate__slideInLeft">
                    <label className="header__primary-info-text">{name}</label>
                    {/* <label className="header__primary-info-text2">{email}</label> */}
                    <marquee className="header__primary-info-text2">Shion: siento un ki qliao entero penca</marquee>
                    <div className="header__primary-image"></div>
                </div>


            </div>


            {/* <div className="header__secondary">
                <div className="header__secondary-actions">
                </div>
            </div> */}
        </div>
    )
}
