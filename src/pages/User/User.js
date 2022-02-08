import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/user';
import { map } from 'lodash';
import UserElement from '../../components/admin/User/UserElement';

import './User.scss';

export default function User() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return null;
  const { getUsers } = data;
  console.log(getUsers);
  return (
    <div className="user">
      <h1 className="user__title">Usuarios</h1>

      <div className="user__box">
        {
          map(getUsers, (user, index) => (
            <UserElement index={ index } user={ user }/>
          ))
        }
      </div>
      <button className="user__create">
        <i class="fas fa-user-plus"></i>
          Crear usuario
      </button>
    </div>
  );
}
