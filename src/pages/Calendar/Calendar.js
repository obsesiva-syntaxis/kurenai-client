//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//Moment Library | Doc: https://momentjs.com/docs/
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

//Redux Syntax | Doc: https://es.redux.js.org/docs/
// import { useDispatch } from 'react-redux';
// import { eventFocusAction, dateFocusAction } from '../../redux/actions/event';
// import { modalState } from '../../redux/actions/modal';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import { useHistory } from 'react-router';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../graphql/GET_EVENTS';

//Own Functions Syntaxis
import { parseDateEvents } from '../../functions/parseDateEvents';
// import { AdmCalendarModal } from './AdmCalendarModal';

import './Calendar.scss';
//Sweet Alert Library | Doc: https://sweetalert2.github.io/#usage
// import Swal from 'sweetalert2';

//translate to spanish
import 'moment/locale/es-mx'
moment.locale('Es-mx');

const localizer = momentLocalizer(moment);

// Config para ejectar en español
export const messages = {
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`
};

export default function AdmCalendar(){

    const history = useHistory()
    // const dispatch = useDispatch();
    const { data, loading } = useQuery(GET_EVENTS);

    if(loading) return null;
    
    const eventParsed = parseDateEvents(data.getEvents);

    const eventStyleGetter = (event) => {

        const style = {
            backgroundColor: event.bgColor,
            opacity: 0.8,
            display: 'block',
            // width: '10px',
            color: '#fff',
        }
        return { style }
    }

    const onDoubleclick = (event) => {
        // dispatch(modalState(true));
    }
    
    const onSelectEvent = (event) => {
        // dispatch( eventFocusAction(event) );
    }

    const onSelectSlot = (event) => {
        // dispatch( dateFocusAction(event.start) );
        history.push('/newevent');
    }


    return (
        <div className="calendar">
            <Calendar 
            className="calendar__main"
                selectable={ true }
                localizer={ localizer }
                events={ eventParsed }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleclick }
                onSelectEvent={ onSelectEvent }
                onSelectSlot={ onSelectSlot }
                views={['month', 'week', 'day']}
            />

            {/* <AdmCalendarModal /> */}
        </div>
    )
}
