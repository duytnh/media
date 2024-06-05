import React, { useEffect, useState } from 'react'
import './style.scss'
import { useAlert } from 'react-alert';
import axios from 'axios';
import Post from '../../../components/Post';
import UploadPost from '../../../components/UploadPost';
import { useSelector } from 'react-redux';

function HomePage() {
    const [allPost, setAllPost] = useState([]);
    const alert = useAlert();
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://hdbasicpro.000webhostapp.com/newmedia/api/getImagePost.php');
                if (response.data.status === 200) {
                    setAllPost(response.data.data);
                } else if (response.data.status === 400) {
                    console.log(response.data);
                    alert.error(response.data.message);
                }
            } catch (error) {
                if (error.response) {
                    console.log('Lỗi phản hồi từ máy chủ: ' + error.response.data);
                } else if (error.request) {
                    alert.error('Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra lại kết nối.');
                    console.log('Lỗi yêu cầu:', error.request);
                } else {
                    console.log('Lỗi: ' + error.message);
                }
            }
        };

        fetchPosts();
    }, [alert]);

    const handleDeletePost = async (image_ids) => {
        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/deletePost.php', {
                image_ids: image_ids,
                access_token: token
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.data.status === 200) {
                alert.success(response.data.message);
                setAllPost(prevPosts => prevPosts.filter(post => !image_ids.some(id => post.image_ids.includes(id))));
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    }

    return (
        <div className='home-page'>
            <div className='upload-post'>
                <UploadPost />
                <hr></hr>
            </div>
            <div className='post-list'>
                <h4>Bài viết</h4>
                {allPost.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            user_avatar={post.user_avatar}
                            user_fullname={post.user_fullname}
                            created_at={post.created_at}
                            description={post.descriptions}
                            images={post.images}
                            total_likes={post.total_likes}
                            total_comments={post.total_comments}
                            comments={post.comments}
                            image_ids={post.image_ids}
                            userId_post={post.user_id}
                            deletePost={handleDeletePost}
                        />
                    );
                })}

            </div>
        </div>
    )
}

export default HomePage
