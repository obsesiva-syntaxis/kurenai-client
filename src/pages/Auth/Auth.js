//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

import LoginForm from '../../components/auth/LoginForm'

import './Auth.scss';

export default function Auth() {


    return (
        <div className="bg__kurenai">
            <div className="container">
                <div className="auth__card">
                    <h1 className="auth__card-title">
                        Kurenai
                    </h1>

                    <LoginForm />    

                </div>
            </div>
        </div>
    )
}
