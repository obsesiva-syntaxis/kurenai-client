import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { TODAY } from '../../../../../graphql/event';
import ModalEvent from '../../../Modal/ModalEvent/ModalEvent';
import { map } from 'lodash';

import './Today.scss';

export default function Today() {
    const { data, loading, refetch } = useQuery(TODAY);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [from, setFrom] = useState('home');

    if (loading) return null;
    const { todayEvent } = data;

    const handleShowModal = id => {
        setSelectedEvent(id);
        setShowModal(true);
    }

    return (
        <div className="today">
            <div className="today__banner">

                <div className="today__banner-title">
                    hoy
                </div>

                <div className="today__banner-events">
                    {
                        map(todayEvent, (event, index) => (
                            <div key={index} className="today__banner-events-event" onClick={ () => handleShowModal(event.id) } style={ { backgroundColor: `${event.bgColor}`, opacity: '0.8'} }>
                                <label>{event.bgColor === '#DC143C' ? 'Bruno Salas Ink' : 'Mario CTM Ink'}</label>
                                <label>{event.insta}</label>
                            </div>
                        ))
                    }
                </div>

                {/* <div className="today__banner-title" style={{ backgroundImage: `linear-gradient(to top, #1e1e1e 0, #ac1130da 0, #1e1e1e ), url(${todayEvent ? todayEvent.user.avatarUrl : 'https://images.unsplash.com/photo-1515446134809-993c501ca304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'})` }}>
                    <h1 className="today__banner-title-text" >
                        HOY
                    </h1>
                </div> */}
                {/* {
                    todayEvent ?
                        (
                            <div className="today__banner-event" onClick={handleShowModal}>
                                <h2 className="today__banner-event-title">{todayEvent.insta}</h2>
                                <div className="today__banner-event-info">
                                    <div className="today__banner-event-info-first">
                                        <p>Evento</p>
                                        <p>{todayEvent.title}</p>
                                    </div>
                                    <div className="today__banner-event-info-second">
                                        <div className="today__banner-event-info-second-estimated">
                                            <p>Estimado:</p>
                                            <p>{todayEvent.hours} hrs</p>
                                        </div>
                                        <div className="today__banner-event-info-second-contact">
                                            <p>{todayEvent.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="today__banner-event">
                                <h1 className="today__banner-event-free">LIBRE</h1>
                            </div>
                        )
                } */}
            </div>
            {
                todayEvent && <ModalEvent eventSelected={selectedEvent} showModal={showModal} setShowModal={setShowModal} refetch={refetch} from={from} />
            }
        </div>
    );
}
