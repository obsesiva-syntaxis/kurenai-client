import React from 'react';
import ImageNotFound from '../../../../../assets/avatar.png';
import moment from 'moment';

import 'moment/locale/es-mx';
import './Banner.scss';
moment.locale('Es-mx');

export default function Banner(props) {
    const { setShowModal, onHandleActions, getUser } = props;
    
    const onHandleModalUser = () => {
        setShowModal(true);
        onHandleActions('main');
    }

    return (
        <div className="banner">
            <div className="banner__box" onClick={onHandleModalUser}>
                <div className="banner__box-avatar" style={{ backgroundImage: `url(${getUser.avatarUrl === '' ? ImageNotFound : getUser.avatarUrl})` }} />
            </div>

            <div className="banner__info">
                <label>{getUser.name}</label>
                <marquee> { moment().format('DD [de] MMMM [del] YYYY') } </marquee>
                <div className="banner__info-bg"></div>
            </div>
        </div>
    )
}
