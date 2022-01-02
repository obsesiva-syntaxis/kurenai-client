//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

import LoginForm from '../../components/auth/LoginForm'

import './Auth.scss';

export default function Auth() {


    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__container-card">
                    <h1>
                        Kurenai
                    </h1>

                    <LoginForm />    

                </div>
            </div>
        </div>
    )
}
