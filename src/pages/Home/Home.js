import React from 'react'; //React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import useAuth from '../../hooks/useAuth';
import PostForm from '../../components/admin/Home/PostForm';
import PostList from '../../components/admin/Home/PostList'
import LastEventAdded from '../../components/admin/Home/LastEventAdded';

import 'moment/locale/es-mx';
import './Home.scss';

export default function Home() {

    const { auth } = useAuth();
    console.log(auth);
    return (
        <div className="home">
            <div className="home__s1">
            <h1>Escribe alguna nota...</h1>
                <div className="home__s1-post">
                    <PostForm auth={ auth } />
                </div>
                <div className="home__s1-feed">
                    <PostList auth={ auth }/>
                </div>
            </div>
            <div className="home__s2">
                <LastEventAdded />
            </div>
            <div className="home__s3"></div>
        </div>

    )
}