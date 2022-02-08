import React from 'react';
import { map } from 'lodash';
import moment from 'moment';

import './PostList.scss';
moment.locale('Es-mx');

export default function PostList( props ) {
    const { getPosts } = props;
    
    
    return (
        <div className="post-list">
            {
                map(getPosts, (post, index) => (
                    <div key={index} className="post-list__box animate__animated animate__fadeIn">
                        <img src={post.user.avatarUrl} alt="message avatar" />
                        <label className="post-list__box-username">
                            {post.user.name}
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
