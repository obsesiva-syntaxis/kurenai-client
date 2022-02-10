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
    const { getEventById, refetch, setModalState } = props;
    
    const [updateEvent] = useMutation(UPDATE_EVENT);


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
            try {
                const finalValues = {
                    ...values,
                    birdDate: moment(values.birdDate).format(),
                    user: getEventById.user.id,
                }

                await updateEvent({
                    variables: {
                        id: getEventById.id,
                        input: finalValues
                    }
                });
                refetch();
                setModalState('info');
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
            <form className="confirm-date__form" onSubmit={formik.handleSubmit}>
                <div className="confirm-date__form-group">
                    {formik.touched.rut && formik.errors.rut ? (<label className="input-group-alert">{formik.errors.rut}</label>) : (<label className="input-group-text">Rut</label>)}
                    <input type="text" name="rut" onBlur={formik.handleBlur} value={formik.values.rut} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.name && formik.errors.name ? (<label className="section__input-group-alert">{formik.errors.name}</label>) : (<label className="section__input-group-text">Nombre</label>)}
                    <input type="text" name="name" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.email && formik.errors.email ? (<label className="section__input-group-alert">{formik.errors.email}</label>) : (<label className="section__input-group-text">Email</label>)}
                    <input type="email" name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.address && formik.errors.address ? (<label className="section__input-group-alert">{formik.errors.address}</label>) : (<label className="section__input-group-text">Dirección</label>)}
                    <input type="text" name="address" onBlur={formik.handleBlur} value={formik.values.address} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (<label className="section__input-group-alert">{formik.errors.phoneNumber}</label>) : (<label className="section__input-group-text">Teléfono</label>)}
                    <input type="text" name="phoneNumber" onBlur={formik.handleBlur} value={formik.values.phoneNumber} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.birdDate && formik.errors.birdDate ? (<label className="section__input-group-alert">{formik.errors.birdDate}</label>) : (<label className="section__input-group-text">Fecha de nacimiento</label>)}
                    <input type="date" name="birdDate" onBlur={formik.handleBlur} value={formik.values.birdDate} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    {formik.touched.hours && formik.errors.hours ? (<label className="section__input-group-alert">{formik.errors.hours}</label>) : (<label className="section__input-group-text">Duración de la sesión</label>)}
                    <input type="number" name="hours" onBlur={formik.handleBlur} value={formik.values.hours} onChange={formik.handleChange} />
                </div>
                <div className="confirm-date__form-group">
                    <button type="submit">Finalizar</button>
                </div>
            </form>
        </div>
    );
}

function initialValues(getEventById) {
    return {
        rut: getEventById.rut || '',
        name: getEventById.name || '',
        email: getEventById.email || '',
        address: getEventById.address || '',
        birdDate: getEventById.birdDate || '',
        phoneNumber: getEventById.phoneNumber || '',
        desc: getEventById.desc || '',
        hours: getEventById.hours,
    }
}