import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/user';
import { map } from 'lodash';
import UserElement from '../../components/admin/User/UserElement';

import './User.scss';
import ModalAdmin from '../../components/admin/Modal/ModalAdmin';
import CreateUser from '../../components/admin/Modal/ModalAdmin/CreateUser';
import { TypeUpdate } from '../../components/admin/Modal/ModalAdmin/TypeUpdate/TypeUpdate';

export default function User() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [childrenModal, setChildrenModal] = useState(null);

  const onHandleActions = (type) => {
    switch (type) {
      case 'create':
        setTitleModal('Crear nuevo usuario');
        setChildrenModal(<CreateUser refetch={ refetch } setShowModal={ setShowModal } />);
        break;

      case 'setType':
        setTitleModal('Configurando nivel');
        setChildrenModal(<TypeUpdate refetch={ refetch } setShowModal={ setShowModal } />);
        break;

      default:
        break;
    }
  }

  const handleNewUser = () => {
    setShowModal(true);
    onHandleActions('create');
  }

  if (loading) return null;
  const { getUsers } = data;
  return (
    <div className="user">
      <h1 className="user__title">Usuarios</h1>

      <div className="user__box">
        {
          map(getUsers, (user, index) => (
            <UserElement index={index} user={user} onHandleActions={ onHandleActions } setShowModal={ setShowModal } refetch={ refetch } />
          ))
        }
      </div>
      <button className="user__create" onClick={handleNewUser}>
        <i className="fas fa-user-plus"></i>
        Crear usuario
      </button>
      <ModalAdmin showModal={showModal} setShowModal={setShowModal} titleModal={titleModal} childrenModal={childrenModal} />
    </div>
  );
}
