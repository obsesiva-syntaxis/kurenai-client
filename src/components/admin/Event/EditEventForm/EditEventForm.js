import React from 'react'; //React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import moment from 'moment'; //Moment Library | Doc: https://momentjs.com/docs/
import { useFormik } from 'formik'; //Formik Library | Doc: https://formik.org/docs/overview
import * as Yup from 'yup'; //Yup Library | Doc: https://www.npmjs.com/package/yup
import { useMutation, useQuery } from '@apollo/client'; //Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { UPDATE_EVENT, GET_EVENT } from '../../../../graphql/event';
import Swal from 'sweetalert2'; //Sweet Alert Library | Doc: https://sweetalert2.github.io/#usage
import useAuth from '../../../../hooks/useAuth';

import 'moment/locale/es-mx';
moment.locale('Es-mx');

export default function EditEventForm(props) {
    const { eventSelected, setHandleEvent, setShowModal, refetch } = props;
    const { auth } = useAuth();
    
    const [updateEvent] = useMutation(UPDATE_EVENT
        , {
        update(cache, { data: { updateEvent } }) {
            const { getEventById } = cache.readQuery({
                query: GET_EVENT,
                variables: {
                    id: eventSelected
                },
            });

            cache.writeQuery({
                query: GET_EVENT,
                variables: { id: eventSelected },
                data: {
                    getEventById: { 
                        insta: updateEvent.insta,
                        title: updateEvent.title,
                        imgUrl: updateEvent.imgUrl,
                        start: updateEvent.start,
                        end: updateEvent.end,
                        bgColor: updateEvent.bgColor,
                        reservePayment: updateEvent.initPayment,
                        hourPayment: updateEvent.initPayment,
                        totalPayment: updateEvent.totalPayment,
                        rut: updateEvent.rut,
                        name: updateEvent.name,
                        email: updateEvent.email,
                        address: updateEvent.address,
                        birdDate: updateEvent.birdDate,
                        phoneNumber: updateEvent.phoneNumber,
                        user: updateEvent.user,
                        desc: updateEvent.desc,
                        hours: updateEvent.hours,
                    }
                }
            })
        }
    }
    );

    const { data: getEvent, loading: loadGetEvent } = useQuery(GET_EVENT, {
        variables: {
            id: eventSelected
        }
    });

    const formik = useFormik({
        initialValues: initialValues(getEvent),
        validationSchema: Yup.object({
            insta: Yup.string().required('Instagram es obligatorio.'),
            title: Yup.string().required('Titulo del evento es obligatorio.'),
            reservePayment: Yup.number().required('Debe existir el pago inicial.').positive('Debe ser un numero positivo.').integer('Debe ser un numero entero'),
            hourPayment: Yup.number().required('Debe existir el pago inicial.').positive('Debe ser un numero positivo.').integer('Debe ser un numero entero'),
            rut: Yup.string(),
            name: Yup.string(),
            email: Yup.string().email('Debe ser un email válido.'),
            address: Yup.string(),
            phoneNumber: Yup.string(),
            desc: Yup.string(),
            hours: Yup.number(),
        }),
        onSubmit: async values => {

            const finalValues = {
                ...values,
                start: moment(getEvent.getEventById.start).format(),
                end: moment(getEvent.getEventById.start).add(values.hours, 'h').format(),
                birdDate: values.birdDate ? moment(values.birdDate).format() : null,
                imgUrl: '',
                bgColor: '#DC143C',
                user: auth.id,
                totalPayment: values.hourPayment - values.reservePayment,
                hourPayment: values.hourPayment,
                reservePayment: values.reservePayment,
            }
            console.log(finalValues);

            try {
                await updateEvent({
                    variables: {
                        id: eventSelected,
                        input: finalValues
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Evento Editado!',
                }).then(result => {
                    if (result.isConfirmed) {
                        setHandleEvent('');
                        setShowModal(true);
                        refetch();
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


    if (loadGetEvent) return null;
    if (!getEvent) return null;

    const handleReturn = () => {
        setHandleEvent('');
        setShowModal(true);
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
                        {/* {formik.touched.birdDate && formik.errors.birdDate ? (<label className="section__input-group-alert">{formik.errors.birdDate}</label>) : (<label className="section__input-group-text">Fecha de nacimiento</label>)} */}
                        <label className="section__input-group-text">Fecha de nacimiento</label>
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
                        <input className="center" type="text" name="start" onBlur={formik.handleBlur} value={formik.values.start} disabled onChange={formik.handleChange} />
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
                        {formik.touched.initPayment && formik.errors.reservePayment ? (<label className="section__input-group-alert">{formik.errors.reservePayment}</label>) : (<label className="section__input-group-text">Abono</label>)}
                        <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="reservePayment" value={formik.values.reservePayment} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {formik.touched.totalPayment && formik.errors.hourPayment ? (<label className="section__input-group-alert">{formik.errors.hourPayment}</label>) : (<label className="section__input-group-text">Valor por hora</label>)}
                        <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="hourPayment" value={formik.values.hourPayment} onChange={formik.handleChange} />
                    </div>
                    <div className="section__input-group">
                        {/* {formik.touched.totalPayment && formik.errors.totalPayment ? (<label className="section__input-group-alert">{formik.errors.totalPayment}</label>) : (<label className="section__input-group-text">Total a pagar</label>)} */}
                        <label className="section__input-group-text">Total a pagar</label>
                        <input className="section__input-group-integer" type="number" onBlur={formik.handleBlur} name="totalPayment" value={ formik.values.totalPayment } placeholder={ formik.values.hourPayment - formik.values.reservePayment } onChange={formik.handleChange} disabled />
                    </div>

                    <button type="submit" className="new-event-form__event-s3-btn-success">Ingresar</button>
                    <button onClick={handleReturn} className="new-event-form__event-s3-btn-alert">Regresar</button>
                </div>
            </div>
        </form>
    )
}


function initialValues(getEvent) {
    return {
        insta: getEvent.getEventById.insta,
        title: getEvent.getEventById.title,
        imgUrl: '',
        start: getEvent.getEventById.start,
        end: getEvent.getEventById.end,
        bgColor: getEvent.getEventById.bgColor,
        reservePayment: getEvent.getEventById.reservePayment,
        totalPayment: getEvent.getEventById.totalPayment,
        hourPayment: getEvent.getEventById.hourPayment,
        rut: getEvent.getEventById.rut ? getEvent.getEventById.rut : '',
        name: getEvent.getEventById.name ? getEvent.getEventById.name : '',
        email: getEvent.getEventById.email ? getEvent.getEventById.email : '',
        address: getEvent.getEventById.address ? getEvent.getEventById.address : '',
        birdDate: getEvent.getEventById.birdDate ? getEvent.getEventById.birdDate : '',
        phoneNumber: getEvent.getEventById.phoneNumber ? getEvent.getEventById.phoneNumber : '',
        desc: getEvent.getEventById.desc ? getEvent.getEventById.desc : '',
        hours: getEvent.getEventById.hours ? getEvent.getEventById.hours : '',
    }
}