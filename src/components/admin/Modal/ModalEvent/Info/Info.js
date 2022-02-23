import React from 'react';
import moment from 'moment'; //Moment Library | Doc: https://momentjs.com/docs/

export default function Info(props) {
    const { getEventById } = props;

    return (
        <>
            <div>
                <label>Nombre del evento: </label>
                <label>{getEventById.title}</label>
            </div>

            <div>
                <label>Instagram: </label>
                <label>{getEventById.insta}</label>
            </div>

            <div>
                <label>Día de la sesión: </label>
                <label>{moment(getEventById.start).format('DD/MM/YYYY')}</label>
            </div>

            <div>
                <label>Abono: </label>
                <label>${getEventById.reservePayment}</label>
            </div>

            <div>
                <label>Valor por hora: </label>
                <label>${getEventById.hourPayment}</label>
            </div>
            <div>
                <label>Total a pagar: </label>
                <label>${getEventById.totalPayment}</label>
            </div>

            <div>
                <label>Descripción:</label>
                <p>{getEventById.desc}</p>
            </div>

            <div>
                <label>Rut: </label>
                <label>{getEventById.rut}</label>
            </div>

            <div>
                <label>Nombre: </label>
                <label>{getEventById.name}</label>
            </div>

            <div>
                <label>Email: </label>
                <label>{getEventById.email}</label>
            </div>

            <div>
                <label>Dirección: </label>
                <label>{getEventById.address}</label>
            </div>

            <div>
                <label>Edad del Cliente: </label>
                <label>{getEventById.birdDate === null ? 'No asignado' : moment().diff(getEventById.birdDate, 'years')}</label>
            </div>

            <div>
                <label>Teléfono: </label>
                <label>{getEventById.phoneNumber}</label>
            </div>

            <div>
                <label>Creado por: </label>
                <label>{getEventById.user.name}</label>
            </div>
        </>
    );
}
