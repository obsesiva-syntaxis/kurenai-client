import React from 'react';
import { useFormik } from 'formik'; //Formik Library | Doc: https://formik.org/docs/overview
import * as Yup from 'yup'; //Yup Library | Doc: https://www.npmjs.com/package/yup
import { useMutation } from '@apollo/client'; 
import { CREATE_POST } from '../../../../../graphql/post';
import moment from 'moment';

import 'moment/locale/es-mx';
import './PostForm.scss';
moment.locale('Es-mx');


export default function PostForm( props ) {
    const { auth, refetch } = props;
    const [createPost] = useMutation(CREATE_POST);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            message: Yup.string().required('este campo es obligatorio'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const result = await createPost({
                variables: {
                    input: {
                        message: values.message,
                        postDate: values.postDate,
                        user: auth.id,
                    }
                }
            });
            refetch();
            resetForm();
        }
    });

    return (
        <form className="post-form" onSubmit={formik.handleSubmit}>
            <textarea type="text" name="message" value={formik.values.message} onChange={formik.handleChange} className="post-form__textbox" cols="30" rows="2" placeholder="Escriba una nota..."></textarea>
            <button type="submit" className="post-form__btn">Enviar</button>
        </form>
    )
}

function initialValues(){
    return {
        name: '',
        message: '',
        postDate: moment().format(),
        userId: '',
        avatarUrl: '',
    }
}