import React from 'react';
import { map } from 'lodash';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../../../../graphql/post';
import Swal from 'sweetalert2'; //Sweet Alert Library | Doc: https://sweetalert2.github.io/#usage

import './PostList.scss';
moment.locale('Es-mx');

export default function PostList(props) {
    const { getPosts, auth, refetch } = props;
    const [ deletePost ] = useMutation(DELETE_POST);
    const handleDeletePost = id => {
        try {
            Swal.fire({
                icon: 'warning',
                title: 'Eliminando post seleccionado...',
                showCancelButton: true,
                confirmButtonColor: '#4BB543',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Proceder',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result.isConfirmed) {
                    try {
                        deletePost({
                            variables: {
                                id: id
                            }
                        });
                        Swal.fire(
                            'Eliminado!',
                            'El post ha sido eliminado exitosamente!',
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
            console.log(err)
        }
    }

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
                        <label className="post-list__box-time">{moment(post.postDate).fromNow()}</label>

                        {
                            auth.id === post.user.id  && <div className='post-list__box-delete' onClick={ () => handleDeletePost( post.id ) }><i className="fas fa-trash-alt"></i></div>
                        }

                    </div>
                ))
            }
        </div>
    )
}
