import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { MODIFY_USER } from '../../../../../graphql/user';
import Swal from 'sweetalert2';

import './NicknameUpdate.scss';

export default function NicknameUpdate(props) {
    const { getUser, setShowModal } = props;
    const [modifyUser] = useMutation(MODIFY_USER);
    const formik = useFormik({
        initialValues: { name: getUser.name },
        onSubmit: async values => {
            const result = await modifyUser({
                variables: {
                    input: {
                        name: values.name
                    }
                }
            });
            if(!result.data.modifyUser){
                Swal.fire({
                    icon: 'error',
                    title: 'No se realizó el cambio de nickname',
                }).then(result => {
                    if (result.isConfirmed) {
                        setShowModal(false);
                    }
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Cambio de nickname exitoso!',
                }).then(result => {
                    if (result.isConfirmed) {
                        setShowModal(false);
                    }
                });
            }
        }
    });

    return (
        <div className="nickname-update">
            <form onSubmit={ formik.handleSubmit }>
                <input name="name" onChange={formik.handleChange} value={formik.values.name} type="text" />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}
