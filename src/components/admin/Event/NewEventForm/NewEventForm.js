import React, { useState } from 'react'; //React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import moment from 'moment'; //Moment Library | Doc: https://momentjs.com/docs/
import { useFormik } from 'formik'; //Formik Library | Doc: https://formik.org/docs/overview
import { useMutation } from '@apollo/client'; //Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { CREATE_EVENT, GET_EVENTS } from '../../../../graphql/event';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2'; //Sweet Alert Library | Doc: https://sweetalert2.github.io/#usage
import * as Yup from 'yup'; //Yup Library | Doc: https://www.npmjs.com/package/yup

import 'moment/locale/es-mx';
import './NewEventForm.scss';

moment.locale('Es-mx');

export default function NewEvent(props) {
    const { dateSelected, setHandleEvent, setDateSelected, refetch } = props;
    const { auth } = useAuth();
    const [payment, setPayment] = useState(false);
    const [btnPayment, setBtnPayment] = useState('Sin Confirmar');

    //HOOKS INIT
    const [createEvent] = useMutation(CREATE_EVENT);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            insta: Yup.string().required('Instagram es obligatorio.'),
            title: Yup.string().required('Titulo del evento es obligatorio.'),
            reservePayment: Yup.number().integer('Debe ser un numero entero'),
            hourPayment: Yup.number().integer('Debe ser un numero entero'),
            rut: Yup.string(),
            name: Yup.string(),
            email: Yup.string().email('Debe ser un email válido.'),
            address: Yup.string(),
            birdDate: Yup.date(),
            phoneNumber: Yup.string(),
            hours: Yup.number().required('Debe ingresar un mínimo').integer('Debe ser un numero entero'),
            arrival: Yup.string().required('Debe ingresar una hora'),
        }),
        onSubmit: async values => {

            const timeArrival = values.arrival.split(':');
            const finalValues = {
                ...values,
                start: moment(dateSelected).hours(timeArrival[0]).minutes(timeArrival[1]).format(),
                end: moment(dateSelected).hours(parseInt(timeArrival[0]) + values.hours).minutes(timeArrival[1]).format(),
                birdDate: !values.birdDate === '' ? moment(values.birdDate) : null,
                imgUrl: '',
                user: auth.id,
                totalPayment: values.hourPayment - values.reservePayment,
                reservePayment: values.reservePayment,
                hourPayment: values.hourPayment,
            }
            delete finalValues.arrival;
            try {
                await createEvent({
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
                        refetch();
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

    const handlePayment = () => {
        setPayment(!payment);
        payment ? setBtnPayment('Sin Confirmar') : setBtnPayment('Agregar');
        if(!payment){
            console.log(formik.values);
            formik.values.hourPayment = 0;
            formik.values.reservePayment = 0;
            formik.values.totalPayment = '';
        }else{
            formik.values.hourPayment = '';
            formik.values.reservePayment = '';
            formik.values.totalPayment = '';
        }
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
                        <select name="bgColor" value={formik.values.bgColor} onChange={formik.handleChange}>
                            <option value="#DC143C" >Bruno Salas Ink</option>
                            <option value="#65ced7" >Mario CTM Ink</option>
                        </select>
                    </div>
                    <div className="section__input-group">
                        <label className="section__input-group-text">Fecha del tatuaje</label>
                        <input className="center" type="text" name="start" onBlur={formik.handleBlur} value={date} disabled onChange={formik.handleChange} />
                    </div>

                    <div className="section__input-group">
                        <label className="section__input-group-text">Descripción:</label>
                        <textarea className="section__input-group-textarea" type="text" name="desc" onBlur={formik.handleBlur} value={formik.values.desc} onChange={formik.handleChange} cols="1" rows="1"></textarea>
                    </div>

                </div>
                <div className="new-event-form__event-s3">
                    <h2 className="section__title">Gestión</h2>
                    <div className="section__input-group">
                        {formik.touched.arrival && formik.errors.arrival ? (<label className="section__input-group-alert">{formik.errors.arrival}</label>) : (<label className="section__input-group-text">Hora de llegada</label>)}
                        <input className="section__input-group-integer" type="time" onBlur={formik.handleBlur} name="arrival" value={formik.values.arrival} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.hours && formik.errors.hours ? (<label className="section__input-group-alert">{formik.errors.hours}</label>) : (<label className="section__input-group-text">Horas estimadas</label>)}
                        <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="hours" value={formik.values.hours} onChange={formik.handleChange} />
                    </div>
                    <fieldset className="new-event-form__event-s3-payment">
                        <legend> Pagos </legend>
                        <div className="new-event-form__event-s3-payment-group">
                            {formik.touched.reservePayment && formik.errors.reservePayment ? (<label className="section__input-group-alert">{formik.errors.reservePayment}</label>) : (<label className="section__input-group-text">Pago inicial</label>)}
                            <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="reservePayment" value={formik.values.reservePayment} onChange={formik.handleChange} disabled={ payment } />
                        </div>
                        <div className="section__input-group">
                            {formik.touched.hourPayment && formik.errors.hourPayment ? (<label className="section__input-group-alert">{formik.errors.hourPayment}</label>) : (<label className="section__input-group-text">Sesión</label>)}
                            <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="hourPayment" value={formik.values.hourPayment} onChange={formik.handleChange} disabled={ payment }/>
                        </div>
                        <div className="section__input-group">
                            <label className="section__input-group-textPayment">Total a pagar : ${formik.values.hourPayment -formik.values.reservePayment}</label>
                            {/* <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="totalPayment" value={formik.values.totalPayment} placeholder={formik.values.hourPayment - formik.values.reservePayment} onChange={formik.handleChange} disabled={true} /> */}
                        </div>
                        {
                            payment ? 
                            (
                                <button type="button" onClick={ () => handlePayment() } style={{ backgroundColor: '#3a8b34'}}>
                                    { btnPayment }
                                </button>
                            ) : (
                                <button type="button" onClick={ () => handlePayment() } style={{ backgroundColor: 'crimson'}}>
                                    { btnPayment }
                                </button>
                            )
                        }
                    </fieldset>

                    <button type="submit" className="new-event-form__btn-success">Ingresar</button>
                    <button onClick={handleReturn} className="new-event-form__btn-alert">Regresar</button>
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
        reservePayment: '',
        hourPayment: '',
        totalPayment: '',
        rut: '',
        name: '',
        email: '',
        address: '',
        birdDate: '',
        phoneNumber: '',
        desc: '',
        hours: '',
        arrival: '',
    }
}