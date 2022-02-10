import React, { useEffect, useState } from 'react'; //React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import { useHistory } from 'react-router-dom'; //React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import useAuth from '../../../../hooks/useAuth';
import Banner from './Banner';
import Today from './Today';
import ModalUser from '../../Modal/ModalUser';
import UserActions from '../../Modal/ModalUser/UserActions';
import AvatarUpdate from '../../Modal/ModalUser/AvatarUpdate';
import PasswordUpdate from '../../Modal/ModalUser/PasswordUpdate';
// import Search from '../../Home/Search';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../../graphql/user';
import { removeToken } from '../../../../utils/token';
import Tomorrow from './Tomorrow';

import './Header.scss';

export default function Header() {
    const { auth, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);
    const history = useHistory();

    const { data, loading, error, startPolling, stopPolling } = useQuery(GET_USER, {
        variables: {
            id: auth.id
        }
    });

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if (auth === null) {
        removeToken();
        history.push('/');
        window.location.reload();
    }

    const onHandleActions = (type) => {
        switch (type) {
            case 'main':
                setTitleModal('Opciones de usuario');
                setChildrenModal(<UserActions onHandleActions={onHandleActions} />);
                break;

            case 'avatar':
                setTitleModal('Configurando Avatar');
                setChildrenModal(<AvatarUpdate getUser={getUser} logout={logout} setShowModal={setShowModal} />);
                break;

            case 'pass':
                setTitleModal('Cambiando contraseña');
                setChildrenModal(<PasswordUpdate setShowModal={setShowModal} logout={logout} />);
                break;

            case 'logout':
                break;
            default:
                break;
        }
    }
    if (loading) return null;
    if (!data) {
        logout();
        window.location.reload();
    }
    const { getUser } = data;

    return (
        <div className="header">
            <Banner auth={auth} getUser={getUser} setShowModal={setShowModal} onHandleActions={onHandleActions} />
            <Today />
            <Tomorrow />
            <ModalUser showModal={showModal} setShowModal={setShowModal} titleModal={titleModal} childrenModal={childrenModal} />
        </div>
    )
}
