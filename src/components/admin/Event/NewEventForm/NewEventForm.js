//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//Moment Library | Doc: https://momentjs.com/docs/
import moment from 'moment';
import 'moment/locale/es-mx';

//Formik Library | Doc: https://formik.org/docs/overview
import { useFormik } from 'formik';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_EVENT, GET_EVENTS } from '../../../../graphql/event';
import useAuth from '../../../../hooks/useAuth';

//Sweet Alert Library | Doc: https://sweetalert2.github.io/#usage
import Swal from 'sweetalert2';

//Yup Library | Doc: https://www.npmjs.com/package/yup
import * as Yup from 'yup';

import './NewEventForm.scss';

moment.locale('Es-mx');

export default function NewEvent( props ) {

    const { dateSelected, setHandleEvent, setDateSelected } = props;
    const { auth } = useAuth();

    //HOOKS INIT
    const [createEvent] = useMutation(CREATE_EVENT, {
        update(cache, { data: { createEvent } }) {
            //obtener el objeto de cache
            const { getEvents } = cache.readQuery({ query: GET_EVENTS })
            //reescribir ese objeto
            cache.writeQuery({
                query: GET_EVENTS,
                data: {
                    getEvents: [...getEvents, createEvent]
                }
            })
        }
    });

    const formik = useFormik({
        initialValues: initialValues(),
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
            hours: Yup.number().required('Debe ingresar un mínimo').positive('Debe ser un valor positivo').integer('Debe ser un numero entero'),
        }),
        onSubmit: async values => {
            const finalValues = {
                ...values,
                start: moment(dateSelected).hours(11).format(),
                end: moment(dateSelected).hours(11).add(values.hours, 'h').format(),
                birdDate: !values.birdDate === '' ? moment(values.birdDate) : null,
                imgUrl: '',
                user: auth.id,
            }
            // const { insta, title, imgUrl, start, end, bgColor, initPayment, totalPayment, rut, name, email, address, birdDate, phoneNumber, desc, user, userName, hours } = finalValues;
            try {
                const result = await createEvent({
                    variables: {
                        input: finalValues
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Evento Creado!',
                }).then(result => {
                    if (result.isConfirmed) {
                        setDateSelected('');
                        setHandleEvent('');
                    }
                });

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo crear evento',
                    text: err,
                });
            }
        }
    });

    const date = moment(dateSelected).format('dddd D [de] MMMM [del] YYYY');

    const handleReturn = () => {
        setDateSelected('');
        setHandleEvent('');
    }

    return (
        <form className="new-event-form" onSubmit={formik.handleSubmit}>
            <div className="new-event-form__event">
                <div className="new-event-form__event-s1">
                    <h2 className="section__title">Datos personales</h2>
                    <div className="section__input-group">
                        {formik.touched.rut && formik.errors.rut ? (<label className="section__input-group-alert">{formik.errors.rut}</label>) : (<label className="section__input-group-text">Rut</label>)}
                        <input className="event__input" type="text" name="rut" onBlur={formik.handleBlur} value={formik.values.rut} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.name && formik.errors.name ? (<label className="section__input-group-alert">{formik.errors.name}</label>) : (<label className="section__input-group-text">Nombre</label>)}
                        <input type="text" name="name" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.email && formik.errors.email ? (<label className="section__input-group-alert">{formik.errors.email}</label>) : (<label className="section__input-group-text">Email</label>)}
                        <input type="email" name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.address && formik.errors.address ? (<label className="section__input-group-alert">{formik.errors.address}</label>) : (<label className="section__input-group-text">Dirección</label>)}
                        <input type="text" name="address" onBlur={formik.handleBlur} value={formik.values.address} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (<label className="section__input-group-alert">{formik.errors.phoneNumber}</label>) : (<label className="section__input-group-text">Teléfono</label>)}
                        <input type="text" name="phoneNumber" onBlur={formik.handleBlur} value={formik.values.phoneNumber} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.birdDate && formik.errors.birdDate ? (<label className="section__input-group-alert">{formik.errors.birdDate}</label>) : (<label className="section__input-group-text">Fecha de nacimiento</label>)}
                        <input className="center" type="date" name="birdDate" onBlur={formik.handleBlur} value={formik.values.birdDate} onChange={formik.handleChange} />
                    </div>
                </div>
                <div className="new-event-form__event-s2">
                    <h2 className="section__title">Evento</h2>
                    <div className="section__input-group">
                        {formik.touched.title && formik.errors.title ? (<label className="section__input-group-alert">{formik.errors.title}</label>) : (<label className="section__input-group-text">Nombre del evento</label>)}
                        <input type="text" name="title" onBlur={formik.handleBlur} value={formik.values.title} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.insta && formik.errors.insta ? (<label className="section__input-group-alert">{formik.errors.insta}</label>) : (<label className="section__input-group-text">Instagram</label>)}
                        <input type="text" name="insta" onBlur={formik.handleBlur} value={formik.values.insta} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        <label className="section__input-group-text">Tatuador</label>
                        {/* <input className="event__input" type="text" name="address" value="Bruno Salas Ink" onBlur={formik.handleBlur} disabled onChange={formik.handleChange} /> */}
                        <select name="bgColor" value={formik.values.bgColor} onChange={formik.handleChange}>
                            <option value="#DC143C" >Bruno Salas Ink</option>
                            {/* <option value="#663399" >Mario CTM Ink</option> */}
                        </select>
                    </div>
                    <div className="section__input-group">
                        <label className="section__input-group-text">Fecha del tatuaje</label>
                        <input className="center" type="text" name="start" onBlur={formik.handleBlur} value={date} disabled onChange={formik.handleChange} />
                    </div>

                    <div className="section__input-group">
                        <label className="section__input-group-text">Descripción:</label>
                        <textarea className="section__input-group-textarea" type="text" name="desc" onBlur={formik.handleBlur} value={formik.values.desc} onChange={formik.handleChange} cols="1" rows="1"></textarea>
                        {/* <input className="event__input center" type="text" name="start" onBlur={formik.handleBlur} value={date} disabled onChange={formik.handleChange} /> */}
                    </div>

                </div>
                <div className="new-event-form__event-s3">
                    <h2 className="section__title">Gestión</h2>
                    <div className="section__input-group">
                        {formik.touched.hours && formik.errors.hours ? (<label className="section__input-group-alert">{formik.errors.hours}</label>) : (<label className="section__input-group-text">Horas estimadas</label>)}
                        <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="hours" value={formik.values.hours} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.initPayment && formik.errors.initPayment ? (<label className="section__input-group-alert">{formik.errors.initPayment}</label>) : (<label className="section__input-group-text">Pago inicial</label>)}
                        <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="initPayment" value={formik.values.initPayment} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.totalPayment && formik.errors.totalPayment ? (<label className="section__input-group-alert">{formik.errors.totalPayment}</label>) : (<label className="section__input-group-text">Total a pagar</label>)}
                        <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="totalPayment" value={formik.values.totalPayment} onChange={formik.handleChange} />
                    </div>

                    <button type="submit" className="new-event-form__event-s3-btn-success">Ingresar</button>
                    <button onClick={handleReturn} className="new-event-form__event-s3-btn-alert">Regresar</button>
                </div>
            </div>
        </form>

    )
}

function initialValues() {
    return { 
        insta: '',
        title: '',
        imgUrl: '',
        start: '',
        end: '',
        bgColor: '#DC143C',
        initPayment: '',
        totalPayment: '',
        rut: '',
        name: '',
        email: '',
        address: '',
        birdDate: '',
        phoneNumber: '',
        desc: '',
        hours: '',
    }
}