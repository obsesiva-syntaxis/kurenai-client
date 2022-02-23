import React, { useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import { GET_POSTS } from '../../../../graphql/post';
import { useQuery } from '@apollo/client'; //Apollo Syntax | Doc: https://www.apollographql.com/docs/

import './Post.scss';

export default function Post( props ) {
  const { auth } = props;
  const { data, loading, startPolling, stopPolling, refetch } = useQuery(GET_POSTS);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [stopPolling, startPolling]);
  
  if (loading) return null;
  if(!data) return null;
  const { getPosts } = data;

  return (
      <div className="post">
        <div className="post__feed">
          <PostList getPosts={ getPosts } auth={ auth } refetch={ refetch } />
        </div>
        <div className="post__form">
          <PostForm refetch={ refetch } auth={ auth } />
        </div>
      </div>
  );
}
