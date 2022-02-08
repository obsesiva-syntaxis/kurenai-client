//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React, { useState } from 'react';

//Moment Library | Doc: https://momentjs.com/docs/
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

//Redux Syntax | Doc: https://es.redux.js.org/docs/
// import { useDispatch } from 'react-redux';
// import { eventFocusAction, dateFocusAction } from '../../redux/actions/event';
// import { modalState } from '../../redux/actions/modal';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
// import { useHistory } from 'react-router';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../graphql/event';

import ModalEvent from '../../components/admin/Modal/ModalEvent';
import NewEventForm from '../../components/admin/Event/NewEventForm';
import EditEventForm from '../../components/admin/Event/EditEventForm';


import './Calendar.scss';
//Sweet Alert Library | Doc: https://sweetalert2.github.io/#usage
// import Swal from 'sweetalert2';

//translate to spanish
import 'moment/locale/es-mx';
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

export default function AdmCalendar() {

    const [showMode, setShowMode] = useState('calendar');
    const [dateSelected, setDateSelected] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [eventSelected, setEventSelected] = useState('');
    const [handleEvent, setHandleEvent] = useState('');
    // const dispatch = useDispatch();
    const { data, loading, refetch } = useQuery(GET_EVENTS);

    if (loading) return null;
    const { getEvents } = data;


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
        const { id } = event;
        setEventSelected( id );
        setShowModal(true);
    }

    const onSelectEvent = (event) => {
    }

    const onSelectSlot = (event) => {
        const { start } = event;
        handleSetupEvent('new', start);
    }

    const handleSetupEvent = (type, date) => {
        switch (type) {
            case 'edit':
                setShowMode('');
                setHandleEvent(<EditEventForm eventSelected={ eventSelected } setShowModal={ setShowModal } setHandleEvent={ setHandleEvent } />);
                break;
            case 'new':
                setHandleEvent(<NewEventForm dateSelected={ date } setHandleEvent={ setHandleEvent } setDateSelected={ setDateSelected }  />);
                break;
            default:
                break;
        }
    }

    return (
        <div className="calendar">
            { handleEvent === '' ?  <Calendar 
                    className="calendar__main"
                        selectable={ true }
                        localizer={ localizer }
                        events={ getEvents }
                        startAccessor="start"
                        endAccessor="end"
                        messages={ messages }
                        eventPropGetter={ eventStyleGetter }
                        onDoubleClickEvent={ onDoubleclick }
                        onSelectEvent={ onSelectEvent }
                        onSelectSlot={ onSelectSlot }
                        views={['month','day']}
                    /> : handleEvent
            }

            <ModalEvent 
                showModal={ showModal } 
                eventSelected={ eventSelected } 
                setShowModal={ setShowModal } 
                refetch={ refetch } 
                handleSetupEvent= { handleSetupEvent }
            />
            
        </div>
    )
}
