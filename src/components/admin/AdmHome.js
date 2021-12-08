//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//React Router Library | Doc: https://reactrouter.com/web/guides/quick-start
import { useHistory } from 'react-router';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST } from '../../graphql/CREATE_POST';
import { GET_POSTS } from '../../graphql/GET_POSTS';
import { GET_USER_AUTH } from '../../graphql/GET_USER_AUTH';

//Formik Library | Doc: https://formik.org/docs/overview
import { useFormik } from 'formik';

//Yup Library | Doc: https://www.npmjs.com/package/yup
import * as Yup from 'yup';

//Moment Library | Doc: https://momentjs.com/docs/
import moment from 'moment';
import 'moment/locale/es-mx';

export const AdmHome = () => {

    const [createPost] = useMutation(CREATE_POST ,{
        update(cache, { data: { createPost } }) {
            //obtener el objeto de cache
            const { getPosts } = cache.readQuery({ query: GET_POSTS })
            //reescribir ese objeto
            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getEvents: [...getPosts, createPost]
                }
            })
        }
    });

    const history = useHistory();


    const { data: userAuth, loading: loadAuth } = useQuery(GET_USER_AUTH);

    const { data: postData, loading: loadPost } = useQuery(GET_POSTS);

    const formik = useFormik({
        initialValues: {
            name: '',
            message: '',
            postDate: moment().format(),
            userId: '',
            avatarUrl: '',
        },
        validationSchema: Yup.object({
            message: Yup.string().required('este campo es obligatorio'),
        }),
        onSubmit: async values => {
            values.avatarUrl = userAuth.getUserAuth.avatarUrl;
            values.userId = userAuth.getUserAuth.id;
            values.name = userAuth.getUserAuth.name;

            const { result } = await createPost({
                variables: {
                    input: {
                        name: values.name,
                        userId: values.userId,
                        avatarUrl: values.avatarUrl,
                        message: values.message,
                        postDate: values.postDate,
                    }
                }
            })
            window.location.reload();
            // console.log(result);
        }
    });

    if (loadAuth) return null;
    if (!userAuth) return null;
    if (loadPost) return null;
    if (!postData) return null;

    console.log(postData);

    return (
        <div className="home">
            <div className="home__s1">
                <div className="home__s1-post">
                    <form onSubmit={formik.handleSubmit}>
                        <textarea type="text" name="message" value={formik.values.message} onChange={formik.handleChange} className="home__s1-post-textbox" cols="30" rows="2"></textarea>
                        <button type="submit" className="home__s1-post-btn">Enviar</button>
                    </form>


                </div>
                <div className="home__s1-feed">

                    {
                        postData.getPosts.slice(0).reverse().map(post => (
                            <div key={post.id} className="home__s1-feed-post">
                                <img className="home__s1-feed-post-avatar" src={post.avatarUrl} alt="el koku" />
                                <label className="home__s1-feed-post-title">{post.name}</label>
                                <div className="home__s1-feed-post-msg">
                                    <label className="home__s1-feed-post-msg-text">
                                        {post.message}
                                    </label>
                                </div>
                                <label className="home__s1-feed-post-time">{post.postDate}</label>
                            </div>
                        ))
                    }


                    {/* <div className="home__s1-feed-post">
                        <img className="home__s1-feed-post-avatar" src="https://media.revistagq.com/photos/5f8959bd54567c4e16ec6a46/4:3/w_960,h_720,c_limit/goku-futbolista.jpg" alt="el koku" />
                        <label className="home__s1-feed-post-title">Koku:</label>
                        <div className="home__s1-feed-post-msg">
                            <label className="home__s1-feed-post-msg-text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</label>
                        </div>
                        <label className="home__s1-feed-post-time">hace 10 min</label>
                    </div>
                    <div className="home__s1-feed-post">
                        <img className="home__s1-feed-post-avatar" src="https://cdn.alfabetajuega.com/wp-content/uploads/2021/02/Majin-Vegeta.jpg?width=1200&aspect_ratio=1200:631" alt="el koku" />
                        <label className="home__s1-feed-post-title">Vegeta:</label>
                        <div className="home__s1-feed-post-msg">
                            <label className="home__s1-feed-post-msg-text">It is a long established fact </label>
                        </div>
                        <label className="home__s1-feed-post-time">hace 30 min</label>
                    </div>
                    <div className="home__s1-feed-post">
                        <img className="home__s1-feed-post-avatar" src="https://pm1.narvii.com/6830/4f19adf4bcc348a5c0621f949705ec5ba487af16v2_hq.jpg" alt="el koku" />
                        <label className="home__s1-feed-post-title">Saga:</label>
                        <div className="home__s1-feed-post-msg">
                            <label className="home__s1-feed-post-msg-text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</label>
                        </div>
                        <label className="home__s1-feed-post-time">hace 40 min</label>
                    </div>
                    <div className="home__s1-feed-post">
                        <img className="home__s1-feed-post-avatar" src="http://snk-seiya.net/guiasaintseiya/tradingr01Shion.jpg" alt="el koku" />
                        <label className="home__s1-feed-post-title">Shion:</label>
                        <div className="home__s1-feed-post-msg">
                            <label className="home__s1-feed-post-msg-text">It is a long established.</label>
                        </div>
                        <label className="home__s1-feed-post-time">hace 50 min</label>
                    </div> */}
                </div>
            </div>
            <div className="home__s2"></div>
            <div className="home__s3"></div>
        </div>

    )
}