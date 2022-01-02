import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client'; //Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { GET_POSTS } from '../../../../graphql/post';
import { map } from 'lodash';
import moment from 'moment';

import './PostList.scss';
moment.locale('Es-mx');

export default function PostList() {
    const { data, loading, startPolling, stopPolling } = useQuery(GET_POSTS);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if (loading) return null;
    if(!data) return null;
    const { getPosts } = data;
    return (
        <div className="post-list">
            
            {
                map(getPosts, (post, index) => (
                    <div key={index} className="post-list__box animate__animated animate__fadeIn">
                        <img src={post.avatarUrl} alt="el koku" />
                        <label className="post-list__box-username">
                            {post.name}
                            <label>
                                :
                            </label>
                        </label>
                        
                        <div className="post-list__box-msg">
                            <label>
                                {post.message}
                            </label>
                        </div>
                        <label className="post-list__box-time">{  moment(post.postDate).fromNow()}</label>
                    </div>
                ))
            }
        </div>
    )
}
