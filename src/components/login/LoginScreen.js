//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React, { useState } from 'react';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import { useHistory } from "react-router-dom";

//Formik Library | Doc: https://formik.org/docs/overview
import { useFormik } from 'formik';

//Yup Library | Doc: https://www.npmjs.com/package/yup
import * as Yup from 'yup';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useMutation } from '@apollo/client';
import { AUTH_USER } from '../../graphql/AUTH_USER';


export const LoginScreen = () => {

    const history = useHistory();
    const [authUser] = useMutation(AUTH_USER);
    const [alert, setAlert] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('El email es obligatorio').email('El email no es válido'),
            password: Yup.string().required('El password es obligatorio').min(6, 'El password debe contener mínimo 6 carácteres')
        }),
        onSubmit: async values => {
            const { email, password } = values;
            try {
                const { data } = await authUser({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });
                //Guardar el token en el localStorage
                const { token } = data.authUser;
                // console.log(token);
                localStorage.setItem('token', token);

                //Redireccionar hacia administracion
                history.push('/adm/home');
            } catch (err) {
                setAlert(err.message.replace('Error: ', ''));
                setTimeout(() => {
                    setAlert(null);
                    successAlert(null);
                    console.log('timeout en 5seg');
                }, 5000);
            }
        }
    });

    const successAlert = () => {
        return (
            <label className="animate__animated animate__tada login__access-alert">{alert}</label>
        )

    }

    return (
        <div className="bg__kurenai">
            <div className="container">
                <div className="login__card">
                    <h1 className="login__title">
                        Kurenai
                    </h1>

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


                    </form>


                    {
                        alert === '' || alert === null ? (
                            null
                        ) : successAlert()
                    }
                </div>
            </div>
        </div>
    )
}
