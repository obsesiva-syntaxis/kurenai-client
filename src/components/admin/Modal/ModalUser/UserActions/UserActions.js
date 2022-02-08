import React from 'react';

import './UserActions.scss';

export default function UserActions( props ) {
    const { onHandleActions } = props;
    console.log('mostrando user acrtions');

    return (
        <div className="user-actions">
            <button onClick={ () => onHandleActions('avatar') }> Avatar </button>
            <button onClick={ () => onHandleActions('pass') }> Cambiar contraseña </button>
            <button onClick={ () => onHandleActions('logout') }> Cerrar Sesión </button>
        </div>
    )
}
