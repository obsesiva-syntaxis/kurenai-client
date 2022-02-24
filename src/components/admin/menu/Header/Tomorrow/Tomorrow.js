import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { TOMORROW } from '../../../../../graphql/event';
import ModalEvent from '../../../Modal/ModalEvent';
import { map } from 'lodash';

import './Tomorrow.scss';

export default function Tomorrow() {
    const { data, loading, refetch } = useQuery(TOMORROW);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [from, setFrom] = useState('home');

    if (loading) return null;
    if (!data) return null;
    const { tomorrowEvent } = data;

    const handleShowModal = id => {
        setSelectedEvent(id);
        setShowModal(true);
    }

    return (
        <div className="tomorrow" >
            <div className="tomorrow__banner">

                <div className="tomorrow__banner-title">
                    mañana
                </div>

                <div className="tomorrow__banner-events">
                    {
                        map(tomorrowEvent, (event, index) => (
                            <div key={index} className="tomorrow__banner-events-event" onClick={ () => handleShowModal(event.id) } style={{ backgroundColor: `${event.bgColor}`, opacity: '0.8' }}>
                                <label>{event.bgColor === '#DC143C' ? 'Bruno Salas Ink' : 'Mario CTM Ink'}</label>
                                <label>{event.insta}</label>
                            </div>
                        ))
                    }
                </div>

                {/* <div className="tomorrow__banner-title" style={{ backgroundImage: `linear-gradient(to top, #1e1e1e 0, #ac1130da 0, #1e1e1e ), url('https://images.unsplash.com/photo-1515446134809-993c501ca304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')` }}>
                    <h1>
                        MAÑANA
                    </h1>
                </div> */}
                {/* {
                    tomorrowEvent ?
                        (
                            <div className="tomorrow__banner-event" onClick={ handleShowModal }>
                                <h2 className="tomorrow__banner-event-title">{tomorrowEvent.insta}</h2>
                                <div className="tomorrow__banner-event-info">
                                    <div className="tomorrow__banner-event-info-first">
                                        <p>Evento :</p>
                                        <p>{tomorrowEvent.title}</p>
                                    </div>
                                    <div className="tomorrow__banner-event-info-second">
                                        <div className="tomorrow__banner-event-info-second-estimated">
                                            <p>Estimado:</p>
                                            <p>{tomorrowEvent.hours} hrs</p>
                                        </div>
                                        <div className="tomorrow__banner-event-info-second-contact">
                                            <p>Contacto:</p>
                                            <p>{tomorrowEvent.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="tomorrow__banner-event">
                                <h1 className="tomorrow__banner-event-free">LIBRE</h1>
                            </div>
                        )
                } */}
            </div>
            {
                tomorrowEvent && <ModalEvent eventSelected={selectedEvent} showModal={showModal} setShowModal={setShowModal} refetch={refetch} from={from} />
            }
        </div>
    );
}
