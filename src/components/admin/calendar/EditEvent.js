//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import { useHistory } from 'react-router';

//Moment Library | Doc: https://momentjs.com/docs/
import moment from 'moment';
import 'moment/locale/es-mx'

//Formik Library | Doc: https://formik.org/docs/overview
import { useFormik } from 'formik';

//Redux Syntax | Doc: https://es.redux.js.org/docs/
import { useDispatch, useSelector } from 'react-redux';
import { dateFocusAction } from '../../../redux/actions/event';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useMutation, useQuery } from '@apollo/client';
// import { CREATE_EVENT } from '../../../graphql/CREATE_EVENT';
import { UPDATE_EVENT } from '../../../graphql/UPDATE_EVENT';
// import { GET_EVENTS } from '../../../graphql/GET_EVENTS';
import { GET_USER_AUTH } from '../../../graphql/GET_USER_AUTH';
import { GET_EVENT } from '../../../graphql/GET_EVENT';

//Sweet Alert Library | Doc: https://sweetalert2.github.io/#usage
import Swal from 'sweetalert2';

//Yup Library | Doc: https://www.npmjs.com/package/yup
import * as Yup from 'yup';

moment.locale('Es-mx');

export const EditEvent = () => {

    //HOOKS INIT
    const { data: userAuth, loading: loadUserAuth } = useQuery(GET_USER_AUTH);
    const [ updateEvent ] = useMutation(UPDATE_EVENT);
    const history = useHistory();
    const dispatch = useDispatch();

    const eventFocus = useSelector(state => state.event.eventFocus);
    const { data: getEvent, loading: loadGetEvent } = useQuery(GET_EVENT, {
        variables: {
            id: eventFocus.id
        }
    });

    const formik = useFormik({
        initialValues: { 
            insta: getEvent.getEventById.insta, 
            title: getEvent.getEventById.title, 
            imgUrl: '', 
            start: moment(getEvent.getEventById.start).format('dddd D [de] MMMM [del] YYYY'), 
            end: getEvent.getEventById.end, 
            bgColor: getEvent.getEventById.bgColor, 
            initPayment: getEvent.getEventById.initPayment, 
            totalPayment: getEvent.getEventById.totalPayment, 
            rut: getEvent.getEventById.rut, 
            name: getEvent.getEventById.name, 
            email: getEvent.getEventById.email, 
            address: getEvent.getEventById.address, 
            birdDate: getEvent.getEventById.birdDate, 
            phoneNumber: getEvent.getEventById.phoneNumber,
            desc: getEvent.getEventById.desc,
            hours: getEvent.getEventById.hours,
        },
        validationSchema: Yup.object({
            insta: Yup.string().required('Instagram es obligatorio.'),
            title: Yup.string().required('Titulo del evento es obligatorio.'),
            initPayment: Yup.number().required('Debe existir el pago inicial.').positive('Debe ser un numero positivo.').integer('Debe ser un numero entero'),
            totalPayment: Yup.number().required('Debe existir un pago.').positive('Debe ser un numero positivo.').integer('Debe ser un numero entero'),
            rut: Yup.string(),
            name: Yup.string(),
            email: Yup.string().email('Debe ser un email válido.'),
            address: Yup.string(),
            birdDate: Yup.date(),
            phoneNumber: Yup.string(),
            desc: Yup.string(),
            hours: Yup.number(),
        }),
        onSubmit: async values => {

            const finalValues = {
                ...values,
                start: moment(getEvent.getEventById.start).format(),
                end: moment(getEvent.getEventById.start).add(values.hours, 'h').format(),
                birdDate: moment(values.birdDate).format(),
                imgUrl: '',
                bgColor: '#DC143C',
                user: userAuth.getUserAuth.id
            }
            
            const { insta, title, imgUrl, start, end, bgColor, initPayment, totalPayment, rut, name, email, address, birdDate, phoneNumber, user, desc, hours } = finalValues;

            try {
                await updateEvent({                   
                    variables: {
                        id: getEvent.getEventById.id,
                        input: { insta, title, imgUrl, start, end, bgColor, initPayment, totalPayment, rut, name, email, address, birdDate, phoneNumber, user, desc, hours }
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Evento Editado!',
                }).then(result => {
                    if (result.isConfirmed) {
                        history.push('/adm/home');
                        window.location.reload();
                    }
                });

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo Editar evento',
                    text: err,
                });
            }
        }
    });

    if (loadUserAuth) return null;
    if (loadGetEvent) return null;
    if (!getEvent) return null;

    const handleReturn = () => {
        dispatch(dateFocusAction(''));
        history.push('/adm/calendar');
    }
    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="event animate__animated animate__fadeIn">
                <div className="event__section1">
                    <h2 className="event__title">Datos personales</h2>
                    <div className="event_input-group">
                        {formik.touched.rut && formik.errors.rut ? (<label className="event__input-text-alert">{formik.errors.rut}</label>) : (<label className="event__input-text">Rut</label>)}
                        <input className="event__input" type="text" name="rut" onBlur={formik.handleBlur} value={formik.values.rut} onChange={formik.handleChange} />
                    </div>
                    <div className="event_input-group">
                        {formik.touched.name && formik.errors.name ? (<label className="event__input-text-alert">{formik.errors.name}</label>) : (<label className="event__input-text">Nombre</label>)}
                        <input className="event__input" type="text" name="name" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} />
                    </div>
                    <div className="event_input-group">
                        {formik.touched.email && formik.errors.email ? (<label className="event__input-text-alert">{formik.errors.email}</label>) : (<label className="event__input-text">Email</label>)}
                        <input className="event__input" type="email" name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
                    </div>
                    <div className="event_input-group">
                        {formik.touched.address && formik.errors.address ? (<label className="event__input-text-alert">{formik.errors.address}</label>) : (<label className="event__input-text">Dirección</label>)}
                        <input className="event__input" type="text" name="address" onBlur={formik.handleBlur} value={formik.values.address} onChange={formik.handleChange} />
                    </div>
                    <div className="event_input-group">
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (<label className="event__input-text-alert">{formik.errors.phoneNumber}</label>) : (<label className="event__input-text">Teléfono</label>)}
                        <input className="event__input" type="text" name="phoneNumber" onBlur={formik.handleBlur} value={formik.values.phoneNumber} onChange={formik.handleChange} />
                    </div>
                    <div className="event_input-group">
                        {formik.touched.birdDate && formik.errors.birdDate ? (<label className="event__input-text-alert">{formik.errors.birdDate}</label>) : (<label className="event__input-text">Fecha de nacimiento</label>)}
                        <input className="event__input center" type="date" name="birdDate" onBlur={formik.handleBlur} value={formik.values.birdDate} onChange={formik.handleChange} />
                    </div>
                </div>
                <div className="event__section2">
                    <h2 className="event__title">Evento</h2>
                    <div className="event_input-group">
                        {formik.touched.title && formik.errors.title ? (<label className="event__input-text-alert">{formik.errors.title}</label>) : (<label className="event__input-text">Nombre del evento</label>)}
                        <input className="event__input" type="text" name="title" onBlur={formik.handleBlur} value={formik.values.title} onChange={formik.handleChange} />
                    </div>
                    <div className="event_input-group">
                        {formik.touched.insta && formik.errors.insta ? (<label className="event__input-text-alert">{formik.errors.insta}</label>) : (<label className="event__input-text">Instagram</label>)}
                        <input className="event__input" type="text" name="insta" onBlur={formik.handleBlur} value={formik.values.insta} onChange={formik.handleChange} />
                    </div>
                    <div className="event_input-group">
                        <label className="event__input-text">Tatuador</label>
                        {/* <input className="event__input" type="text" name="address" value="Bruno Salas Ink" onBlur={formik.handleBlur} disabled onChange={formik.handleChange} /> */}
                        <select className="event__input" name="bgColor" value={formik.values.bgColor} onChange={formik.handleChange}>
                            <option value="#DC143C" >Bruno Salas Ink</option>
                            {/* <option value="#663399" >Mario CTM Ink</option> */}
                        </select>
                    </div>
                    <div className="event_input-group">
                        <label className="event__input-text">Fecha del tatuaje</label>
                        <input className="event__input center" type="text" name="start" onBlur={formik.handleBlur} value={formik.values.start} disabled onChange={formik.handleChange} />
                    </div>

                    <div className="event_input-group">
                        <label className="event__input-text">Descripción:</label>
                        <textarea className="event__input-text-area" type="text" name="desc" onBlur={formik.handleBlur} value={formik.values.desc} onChange={formik.handleChange} cols="1" rows="1"></textarea>
                        {/* <input className="event__input center" type="text" name="start" onBlur={formik.handleBlur} value={date} disabled onChange={formik.handleChange} /> */}
                    </div>

                </div>
                <div className="event__section3">
                    <h2 className="event__title">Gestión</h2>
                    <div className="event_input-group">
                        {formik.touched.hours && formik.errors.hours ? (<label className="event__input-text-alert">{formik.errors.hours}</label>) : (<label className="event__input-text">Horas estimadas</label>)}
                        <input className="event__input-valor" type="number" onBlur={formik.handleBlur} name="hours" value={formik.values.hours} onChange={formik.handleChange} />
                    </div>
                    <div className="event_input-group">
                        {formik.touched.initPayment && formik.errors.initPayment ? (<label className="event__input-text-alert">{formik.errors.initPayment}</label>) : (<label className="event__input-text">Pago inicial</label>)}
                        <input className="event__input-valor" type="number" onBlur={formik.handleBlur} name="initPayment" value={formik.values.initPayment} onChange={formik.handleChange} />
                    </div>
                    <div className="event_input-group">
                        {formik.touched.totalPayment && formik.errors.totalPayment ? (<label className="event__input-text-alert">{formik.errors.totalPayment}</label>) : (<label className="event__input-text">Total a pagar</label>)}
                        <input className="event__input-valor" type="number" onBlur={formik.handleBlur} name="totalPayment" value={formik.values.totalPayment} onChange={formik.handleChange} />
                    </div>

                    <button className="event__btn-success">Ingresar</button>
                    <button onClick={handleReturn} className="event__btn-alert">Regresar</button>
                </div>
            </div>
        </form>
    )
}
