//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

import LoginForm from '../../components/auth/LoginForm'

import './Auth.scss';

export default function Auth() {


    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__container-card">
                    <div className="auth__container-card-logo" />

                    <LoginForm />    

                </div>
            </div>
        </div>
    )
}
