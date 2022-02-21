import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useApolloClient } from '@apollo/client';
import { MODIFY_USER } from '../../../../../graphql/user';
import Swal from 'sweetalert2';

import './PasswordUpdate.scss';

export default function PasswordUpdate( props ) {
    const { setShowModal, logout } = props;
    const [ modifyUser ] = useMutation(MODIFY_USER);
    const client = useApolloClient();
    const history = useHistory();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Debe escribir un password'),
            newPassword: Yup.string().required('Debe escribir un password').oneOf([Yup.ref('repeatNewPassword')]),
            repeatNewPassword: Yup.string().required('Debe escribir un password').oneOf([Yup.ref('newPassword')]),
        }),
        onSubmit: async values => {
            try {
                const result = await modifyUser({
                    variables: {
                        input: {
                            currentPassword: values.currentPassword,
                            newPassword: values.newPassword,
                        }
                    }
                });
                if(!result.data.modifyUser){
                    Swal.fire({
                        icon: 'error',
                        title: 'No se realizó el cambio de contraseña',
                    }).then(result => {
                        if (result.isConfirmed) {
                            setShowModal(false);
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cambio de contraseña exitoso!',
                        text: 'Procediendo a salir de la sesión',
                    }).then(result => {
                        if (result.isConfirmed) {
                            client.clearStore();
                            setShowModal(false);
                            logout();
                            history.push('/');
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
    })

    return (
        <div className="password-update">
            <form onSubmit={ formik.handleSubmit }>
                {
                    formik.touched.currentPassword && formik.errors.currentPassword  ? (
                        <input name="currentPassword" onChange={ formik.handleChange } value={ formik.values.currentPassword } error={ formik.errors.currentPassword && true} type="password" placeholder={formik.errors.currentPassword}/>
                        ) : (
                        <input name="currentPassword" onChange={ formik.handleChange } value={ formik.values.currentPassword } error={ formik.errors.currentPassword && true} type="password" placeholder="Escriba contraseña actual..."/>
                    )
                }
                {
                    formik.touched.currentPassword && formik.errors.currentPassword  ? (
                            <input name="newPassword" onChange={ formik.handleChange } value={ formik.values.newPassword } error={ formik.errors.newPassword && true} type="password" placeholder={formik.errors.newPassword}/>
                        ) : (
                            <input name="newPassword" onChange={ formik.handleChange } value={ formik.values.newPassword } error={ formik.errors.newPassword && true} type="password" placeholder="Escriba nueva contraseña... "/>
                    )
                }
                {
                    formik.touched.currentPassword && formik.errors.currentPassword  ? (
                            <input name="repeatNewPassword" onChange={ formik.handleChange } value={ formik.values.repeatNewPassword } error={ formik.errors.repeatNewPassword && true} type="password" placeholder={ formik.errors.repeatNewPassword }/>
                        ) : (
                           <input name="repeatNewPassword" onChange={ formik.handleChange } value={ formik.values.repeatNewPassword } error={ formik.errors.repeatNewPassword && true} type="password" placeholder="Repita nueva contraseña... "/>
                    )
                }
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}

function initialValues() {
    return {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
    }
}