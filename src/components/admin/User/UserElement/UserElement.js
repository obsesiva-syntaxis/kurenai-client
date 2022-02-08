import React from 'react';

import './UserElement.scss';

export default function UserElement(props) {
    const { index, user } = props;

    return (
        <div key={index} className="user-element">
            <div className="user-element__avatar" style={{ backgroundImage: `url(${user.avatarUrl})` }}></div>
            <div className="user-element__item">
                <label>Usuario</label>
                <p>{user.name}</p>
            </div>
            <div className="user-element__item">
                <label>Correo</label>
                <p>{user.email}</p>
            </div>
            <div className="user-element__item">
                <label>Nivel</label>
                <p>{user.type}</p>
            </div>
            <div className="user-element__actions">
                <button className="user-element__actions-btn btn-purple">
                    <i class="fas fa-user-edit"></i>
                </button>
                <button className="user-element__actions-btn btn-red">
                    <i class="fas fa-user-minus"></i>
                </button>
            </div>
            {/* <p>avatar: {user}</p> */}            
        </div>
    );
}
