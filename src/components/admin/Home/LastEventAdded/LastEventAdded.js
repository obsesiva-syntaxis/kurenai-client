import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import { useQuery } from '@apollo/client';
import ModalEvent from '../../Modal/ModalEvent';
import { LAST_EVENTS_ADDED } from '../../../../graphql/event'
import EditEventForm from '../../Event/EditEventForm';

import './LastEventAdded.scss';

export default function LastEventAdded() {

    const { data, loading, startPolling, stopPolling, refetch } = useQuery(LAST_EVENTS_ADDED);

    const [selectedEvent, setSelectedEvent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [handleEvent, setHandleEvent] = useState('');

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling]);

    if (loading) return null;
    if (!data) return null;

    const { lastEventsAdded } = data;

    const handleEventSelected = event => {
        setSelectedEvent(event.id);
        setShowModal(true);
    }

    const handleSetupEvent = (type, date) => {
        switch (type) {
            case 'edit':
                setHandleEvent(<EditEventForm eventSelected={selectedEvent} setShowModal={setShowModal} setHandleEvent={setHandleEvent} />);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="last-event-added">
                <label className="last-event-added__title">Últimos eventos agregados</label>
                <div className="last-event-added__box">
                    {
                        map(lastEventsAdded, (event, index) => (
                            <div key={index} className="last-event-added__box-index" onClick={() => handleEventSelected(event)}>
                                <div className="last-event-added__box-index-avatar" style={{ backgroundImage: `url('${event.user.avatarUrl}')` }} />
                                <p>Evento: {event.title}</p>
                                <p>Instagram: {event.insta}</p>
                            </div>
                        ))
                    }
                </div>

                <ModalEvent
                    showModal={showModal}
                    eventSelected={selectedEvent}
                    setShowModal={setShowModal}
                    refetch={refetch}
                    handleSetupEvent={handleSetupEvent}
                />

            </div>


        </>
    )
}
