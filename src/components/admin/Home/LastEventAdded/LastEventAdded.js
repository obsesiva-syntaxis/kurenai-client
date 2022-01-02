import React, { useEffect } from 'react';
import { map } from 'lodash';
import { useQuery } from '@apollo/client';
import { LAST_EVENTS_ADDED } from '../../../../graphql/event'

import './LastEventAdded.scss';

export default function LastEventAdded() {

    const { data, loading, startPolling, stopPolling } = useQuery(LAST_EVENTS_ADDED);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling]);

    if(loading) return null;
    if(!data) return null;
    
    const { lastEventsAdded } = data;

    return (
        <div className="last-event-added">
            <label className="last-event-added__title">Últimos eventos agregados</label>
            <div className="last-event-added__box">
            {
                map(lastEventsAdded, (event, index) => (
                    <div key={index} className="last-event-added__box-index">
                        <div className="last-event-added__box-index-avatar" style={{ backgroundImage: `url('${event.user.avatarUrl}')`}} />
                        <p>Evento: {event.title}</p>
                        <p>Instagram: {event.insta}</p>
                        <p>Creado por: {event.user.name}</p>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
