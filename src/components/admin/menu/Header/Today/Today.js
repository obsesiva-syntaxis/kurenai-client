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
    console.log(data);

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
            </div>
            {
                todayEvent && <ModalEvent eventSelected={selectedEvent} showModal={showModal} setShowModal={setShowModal} refetch={refetch} from={from} />
            }
        </div>
    );
}
