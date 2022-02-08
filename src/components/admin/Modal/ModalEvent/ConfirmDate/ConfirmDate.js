import React from 'react';

//Moment Library | Doc: https://momentjs.com/docs/
import moment from 'moment';
import 'moment/locale/es-mx';

//Formik Library | Doc: https://formik.org/docs/overview
import { useFormik } from 'formik';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EVENT, GET_EVENT } from '../../../../../graphql/event';

//Yup Library | Doc: https://www.npmjs.com/package/yup
import * as Yup from 'yup';

//Sweet Alert Library | Doc: https://sweetalert2.github.io/#usage
import Swal from 'sweetalert2';

import './ConfirmDate.scss';



export default function ConfirmDate(props) {
    const { getEventById } = props;
    
    const [updateEvent] = useMutation(UPDATE_EVENT, {
        update(cache, { data: { updateEvent } }) {
            const { getEventById } = cache.readQuery({
                query: GET_EVENT,
                variables: {
                    id: getEventById.id
                },
            });

            cache.writeQuery({
                query: GET_EVENT,
                variables: { id: getEventById.id },
                data: {
                    getEventById: {
                        insta: updateEvent.insta,
                        title: updateEvent.title,
                        imgUrl: updateEvent.imgUrl,
                        start: updateEvent.start,
                        end: updateEvent.end,
                        bgColor: updateEvent.bgColor,
                        initPayment: updateEvent.initPayment,
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
    });


    const formik = useFormik({
        initialValues: initialValues(getEventById),
        validationSchema: Yup.object({
            rut: Yup.string(),
            name: Yup.string(),
            email: Yup.string().email('Debe ser un email válido.'),
            address: Yup.string(),
            birdDate: Yup.date(),
            phoneNumber: Yup.string(),
            hours: Yup.number(),
        }),
        onSubmit: async values => {

            const finalValues = {
                ...values,
                start: moment(getEventById.start).format(),
                end: moment(getEventById.start).add(values.hours, 'h').format(),
                birdDate: moment(values.birdDate).format(),
                imgUrl: '',
                bgColor: '#DC143C',
                user: getEventById.user.id
            }

            try {
                await updateEvent({
                    variables: {
                        id: getEventById.id,
                        input: finalValues
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Evento Editado!',
                }).then(result => {
                    if (result.isConfirmed) {
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

    return (
        <div className="confirm-date">
            <div className="confirm-date__form">
                <div className="confirm-date__form-group">
                    {formik.touched.rut && formik.errors.rut ? (<label className="input-group-alert">{formik.errors.rut}</label>) : (<label className="input-group-text">Rut</label>)}
                    <input type="text" name="rut" onBlur={formik.handleBlur} value={formik.values.rut} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.rut && formik.errors.rut ? (<label className="section__input-group-alert">{formik.errors.rut}</label>) : (<label className="section__input-group-text">Rut</label>)}
                    <input type="text" name="rut" onBlur={formik.handleBlur} value={formik.values.rut} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.rut && formik.errors.rut ? (<label className="section__input-group-alert">{formik.errors.rut}</label>) : (<label className="section__input-group-text">Rut</label>)}
                    <input type="text" name="rut" onBlur={formik.handleBlur} value={formik.values.rut} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.rut && formik.errors.rut ? (<label className="section__input-group-alert">{formik.errors.rut}</label>) : (<label className="section__input-group-text">Rut</label>)}
                    <input type="text" name="rut" onBlur={formik.handleBlur} value={formik.values.rut} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.rut && formik.errors.rut ? (<label className="section__input-group-alert">{formik.errors.rut}</label>) : (<label className="section__input-group-text">Rut</label>)}
                    <input type="text" name="rut" onBlur={formik.handleBlur} value={formik.values.rut} onChange={formik.handleChange} />
                </div>
            </div>
        </div>
    );
}

function initialValues(getEventById) {
    return {
        insta: getEventById.insta,
        title: getEventById.title,
        imgUrl: '',
        start: moment(getEventById.start).format('dddd D [de] MMMM [del] YYYY'),
        end: getEventById.end,
        bgColor: getEventById.bgColor,
        initPayment: getEventById.initPayment,
        totalPayment: getEventById.totalPayment,
        rut: getEventById.rut,
        name: getEventById.name,
        email: getEventById.email,
        address: getEventById.address,
        birdDate: getEventById.birdDate,
        phoneNumber: getEventById.phoneNumber,
        desc: getEventById.desc,
        hours: getEventById.hours,
    }
}