import React from 'react'; //React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import { useHistory } from 'react-router-dom'; //React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import useAuth from '../../../../hooks/useAuth';
import Banner from './Banner';

import './Header.scss';

export default function Header(){

    const history = useHistory();
    const { auth } = useAuth();

    if (auth === null) {
        history.push('/');
        window.location.reload();
    }

    return (
        <div className="header">
            <Banner auth={ auth } />
            {/* //COMPONENTE DE BUSCAR */}
            <h1>buscar</h1>
        </div>
    )
}
