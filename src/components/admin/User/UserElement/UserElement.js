import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../../../graphql/user';
import Swal from 'sweetalert2';

import './UserElement.scss';

export default function UserElement(props) {
    const { index, user, setShowModal, onHandleActions, refetch } = props;
    const [ deleteUser ] = useMutation(DELETE_USER);

    const handleDeleteUser = (id) => {
        try {
            Swal.fire({
                icon: 'warning',
                title: 'Eliminando usuario seleccionado...',
                showCancelButton: true,
                confirmButtonColor: '#4BB543',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Proceder',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result.isConfirmed) {
                    try {
                        deleteUser({
                            variables: {
                                id
                            }
                        });
                        Swal.fire(
                            'Eliminado!',
                            'El usuario ha sido eliminado exitosamente!',
                            'success'
                        ).then(result => {
                            if (result.isConfirmed) {
                                refetch();
                            }
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    const handleEditUser = () => {
        setShowModal(true);
        onHandleActions('setType');
    }

    return (
        <div key={ index } className="user-element">
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
                <button className="user-element__actions-btn btn-purple" onClick={ handleEditUser }>
                    <i className="fas fa-user-edit"></i>
                </button>
                <button className="user-element__actions-btn btn-red" onClick={ () => handleDeleteUser(user.id) }>
                    <i className="fas fa-user-minus"></i>
                </button>
            </div>
            {/* <p>avatar: {user}</p> */}            
        </div>
    );
}
