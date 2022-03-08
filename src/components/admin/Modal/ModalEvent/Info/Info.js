import React from 'react';
import moment from 'moment'; //Moment Library | Doc: https://momentjs.com/docs/

import './Info.scss';

export default function Info(props) {
    const { getEventById } = props;

    const handleLinkInstagram = ( insta ) => {
        window.open(`https://www.instagram.com/${insta.replace('@', '')}`, '_blank').focus();
    }

    return (
        <div className="info">
            <div className="info__event" style={{ backgroundColor: `${getEventById.bgColor}` }}>
                <div className="info__event-section">
                    <div className="info__event-section-title">
                        <label>{getEventById.title}</label>
                    </div>
                </div>
                <div className="info__event-section">
                    <div className="info__event-section-tatuador">
                        <label>Tatuador:</label>
                        {
                            getEventById.bgColor === '#DC143C' ? <label className="text-info">Bruno Salas INK</label> : <label className="text-info">Mario CTM INK</label>
                        }
                    </div>
                    <div className="info__event-section-date">
                        <label>Fecha:</label>
                        <label className="text-info">{moment(getEventById.start).format('dddd DD [de] MMMM [del] YYYY')}</label>
                    </div>
                </div>
                <div className="info__event-section">
                    <div className="info__event-section-desc">
                        <label>Descripción</label>
                        <p>{getEventById.desc}</p>
                    </div>
                </div>
                <div className="info__event-section">
                    <div className="info__event-section-user">
                        <label>
                            creado por {getEventById.user.name}
                        </label>
                    </div>
                </div>
            </div>
            <div className="info__client" onClick={ () => handleLinkInstagram( getEventById.insta ) }>
                <div className="info__client-title">
                    <div className="info__client-title-insta">
                        <i className="fab fa-instagram"></i>
                        <p>{getEventById.insta}</p>
                    </div>
                </div>
                <div className="info__client-section">
                    <div className="info__client-section-first">
                        <label>Rut: </label>
                        <label className="text-info">{getEventById.rut || 'No asignado'}</label>
                        <label>Email: </label>
                        <label className="text-info">{getEventById.email || 'No asignado'}</label>
                        <label>Dirección: </label>
                        <label className="text-info">{getEventById.address || 'No asignado'}</label>
                    </div>
                    <div className="info__client-section-second">
                        <label>Nombre: </label>
                        <label className="text-info">{getEventById.name || 'No asignado'}</label>
                        <label>Edad: </label>
                        <label className="text-info">{getEventById.birdDate === null ? 'No asignado' : moment().diff(getEventById.birdDate, 'years')}</label>
                        <label>Teléfono: </label>
                        <label className="text-info">{getEventById.phoneNumber || 'No asignado'}</label>
                    </div>
                </div>
            </div>

            <div className="info__payment">
                <div className="info__payment-section">
                    <div>
                        <label>Abono: </label>
                        <label>${getEventById.reservePayment}</label>
                    </div>
                    <div>
                        <label>Sesión: </label>
                        <label>${getEventById.hourPayment}</label>
                    </div>
                </div>
                <div className="info__payment-total">
                    <label>Total a pagar: </label>
                    <label>${getEventById.totalPayment}</label>
                </div>
            </div>


        </div>
    );
}
