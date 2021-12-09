//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React, { useState } from 'react';

//Formik Library | Doc: https://formik.org/docs/overview
import { useFormik } from 'formik';

//Yup Library | Doc: https://www.npmjs.com/package/yup
import * as Yup from 'yup';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useMutation } from '@apollo/client';
import { AUTH_USER } from '../../graphql/AUTH_USER';

import useAuth from '../../hooks/useAuth';
import { setToken, decodeToken } from '../../utils/token';

import './LoginForm.scss';

export default function LoginForm() {

    const [error, setError] = useState('');
    const [authUser] = useMutation(AUTH_USER);
    const { setUser } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().required('El email es obligatorio').email('El email no es válido'),
            password: Yup.string().required('El password es obligatorio').min(6, 'El password debe contener mínimo 6 carácteres')
        }),
        onSubmit: async values => {
            setError('');
            try {
                const { data } = await authUser({
                    variables: { input: values }
                });
                const { token } = data.authUser;
                setToken(token);
                setUser(decodeToken(token));
            } catch (err) {
                setError(err.message);
            }
        }
    });

    return (
        <form className="login__form" onSubmit={formik.handleSubmit}>
            <div className="login__form-input-group">
                {
                    formik.touched.email && formik.errors.email ? (
                        <label className="login__alert">{formik.errors.email}</label>
                    ) : (
                        <label className="login__form-text">Email</label>

                    )
                }
                <input className="login__form-input"
                    type="text"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
            </div>

            <div className="login__form-input-group">
                {
                    formik.touched.password && formik.errors.password ? (
                        <label className="login__alert">{formik.errors.password}</label>
                    ) : (
                        <label className="login__form-text">Password</label>

                    )
                }
                <input className="login__form-input"
                    type="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
            </div>

            <button className="login__form-btn" type="submit">
                Aceptar
            </button>

            {
                error && <p className="submit-error">{error}</p>
            }

        </form>
    )
}

function initialValues() {
    return {
        email: '',
        password: ''
    }
}