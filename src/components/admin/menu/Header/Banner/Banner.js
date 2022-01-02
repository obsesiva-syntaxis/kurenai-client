import React from 'react';

import './Banner.scss';

export default function Banner( props ) {
    const { auth } = props;
    return (
        <div className="banner">
            <div className="banner__avatar">
                <img src={auth.avatarUrl} alt="" />
            </div>

            <div className="banner__info">
                <label>{auth.name}</label>
                <marquee>Shion: siento un ki qliao entero penca</marquee>
                <div className="banner__info-bg"></div>
            </div>
        </div>
    )
}
