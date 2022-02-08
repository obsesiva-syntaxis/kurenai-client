import React from 'react'; //React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import useAuth from '../../hooks/useAuth';
import Post from '../../components/admin/Home/Post';
import LastEventAdded from '../../components/admin/Home/LastEventAdded';
import Search from '../../components/admin/Home/Search/Search';

import 'moment/locale/es-mx';
import './Home.scss';

export default function Home() {

    const { auth } = useAuth();
    return (
        <div className="home">
            <div className="home__s1">
                <Post auth={ auth } />
            </div>
            <div className="home__s2">
                <LastEventAdded />
            </div>
            <div className="home__s3">
                <Search />
            </div>
        </div>

    )
}