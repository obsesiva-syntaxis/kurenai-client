import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../../../graphql/user';
import Swal from 'sweetalert2';

import './CreateUser.scss';

export default function CreateUser( props ) {
    const { refetch, setShowModal } = props;
    const [ createUser ] = useMutation(CREATE_USER);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required('Debe registrar un nickname.'),
            email: Yup.string().email('Debe ser un email válido.').required('Debe registrar un email'),
        }),
        onSubmit: async values => {
            try {
                const result = await createUser({
                    variables: {
                        input: values
                    }
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Usuario Creado!',
                }).then(result => {
                    if (result.isConfirmed) {
                        refetch();
                        setShowModal(false);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    });
    return (
        <div className="create-user">
            <form onSubmit={formik.handleSubmit}>

                {
                    formik.touched.name && formik.errors.name ? (
                        <input name="name" value={formik.values.name} onChange={formik.handleChange} type="text" placeholder={formik.errors.name} error={formik.errors.name && true} />
                    ) : (
                        <input name="name" value={formik.values.name} onChange={formik.handleChange} type="text" placeholder="Ingrese un nickname..." error={formik.errors.name && true} />
                    )
                }
                {
                    formik.touched.email && formik.errors.email ? (
                        <input name="email" value={formik.values.email} onChange={formik.handleChange} type="text" placeholder={formik.errors.email} error={formik.errors.email && true} />
                    ) : (
                        <input name="email" value={formik.values.email} onChange={formik.handleChange} type="text" placeholder="Ingrese email..." error={formik.errors.email && true} />
                    )
                }

                <select name="type" value={formik.values.type} onChange={formik.handleChange}>
                    <option value="puppet-master" >Puppet Master</option>
                    <option value="overlord" >Over Lord</option>
                </select>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}

function initialValues() {
    return {
        name: '',
        email: '',
        type: '',
        password: '123456',
    }
}
