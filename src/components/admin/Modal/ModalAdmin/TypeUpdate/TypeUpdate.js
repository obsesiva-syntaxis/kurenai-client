import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { MODIFY_USER } from '../../../../../graphql/user'

import './TypeUpdate.scss';

export const TypeUpdate = (props) => {
    const { refetch, setShowModal } = props;
    const [ modifyUser ] = useMutation(MODIFY_USER);
    const formik = useFormik({
        initialValues: { type: 'puppet-master' },
        onSubmit: async values => {
            try {
                console.log(values);
                const result = await modifyUser({
                    variables:{
                        input: {
                            type: values.type
                        }
                    }
                });
                refetch();
                setShowModal(false);
            } catch (err) {
                console.log(err);
            }
        }
    });
    return (
        <div className="type-update">
            <form onSubmit={formik.handleSubmit}>
                <select name="type" value={formik.values.type} onChange={formik.handleChange}>
                    <option value="puppet-master" >Puppet Master</option>
                    <option value="overlord" >Over Lord</option>
                </select>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}
