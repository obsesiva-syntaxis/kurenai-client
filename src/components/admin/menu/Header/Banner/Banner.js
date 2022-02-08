import React from 'react';
import ImageNotFound from '../../../../../assets/avatar.png';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../../../../graphql/post';
import moment from 'moment';

import 'moment/locale/es-mx';
import './Banner.scss';
moment.locale('Es-mx');

export default function Banner(props) {
    const { setShowModal, onHandleActions, getUser } = props;
    const { data, loading } = useQuery(GET_POSTS);


    const onHandleModalUser = () => {
        setShowModal(true);
        onHandleActions('main');
    }

    if (loading) return null;
    const { getPosts } = data;

    return (
        <div className="banner">
            <div className="banner__box" onClick={onHandleModalUser}>
                <div className="banner__box-avatar" style={{ backgroundImage: `url(${getUser.avatarUrl === '' ? ImageNotFound : getUser.avatarUrl})` }} />
            </div>

            <div className="banner__info">
                <label>{getUser.name}</label>
                <marquee> {moment().format('dddd DD [de] MMMM [del] YYYY')} </marquee>
                <div className="banner__info-bg"></div>
            </div>
        </div>
    )
}
