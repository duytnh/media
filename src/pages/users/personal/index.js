import React, { useEffect, useState } from 'react'
import './style.scss'
import IconFriend from '../../../components/IconFriend'
import Post from '../../../components/Post';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UploadPost from '../../../components/UploadPost';
import { useAlert } from 'react-alert';
import axios from 'axios';

const Personal = () => {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const navigate = useNavigate();
    const [allPost, setAllPost] = useState([]);
    const alert = useAlert();

    const postData = {
        access_token: `Bearer ${token}`
    };

    useEffect(() => {
        if (user == null) {
            navigate('/login');
            return;
        }
    }, [navigate, user]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/getImagePostByUser.php', postData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                );
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
    }, [alert, token]);

    return (
        <div className='personal'>
            <div className='picture'>
                <img className='background-img' src='./anh-nen.webp' alt='Ảnh nền' />
                <img className='avt-img' src='./anh-nen.webp' alt='Ảnh đại diện' />
            </div>
            <div className='info'>
                <h4>Name User</h4>
                <button><i className="fa-solid fa-pen"></i> Chỉnh sửa trang cá nhân</button>
            </div>
            <div className='info-details'>
                <p>Email: email@gamil.com</p>
                <p>Giới thiệu: <br />Xin chào. Chào mừng bạn đến xem trang cá nhân của tôi</p>
                <p>Ngày tham gia: 19/05/2024</p>
            </div>
            <hr />
            <UploadPost />
            <hr></hr>

            <div className='list-friend'>
                <h4>Bạn bè</h4>
                <div className='lists'>
                    <IconFriend />
                    <IconFriend />
                    <IconFriend />
                    <IconFriend />
                    <IconFriend />
                    <IconFriend />
                </div>
                <button>Xem tất cả bạn bè</button>
            </div>
            <hr />
            <div className='post-list'>
                <h4>Bài viết</h4>
                {allPost.map((post, index) => (
                    <Post
                        key={index}
                        user_avatar={post.user_avatar}
                        user_fullname={post.user_fullname}
                        created_at={post.created_at}
                        description={post.description}
                        images={post.images}
                        total_likes={post.total_likes}
                        total_comments={post.total_comments}
                        comments={post.comments}
                    />
                ))}
            </div>
        </div>
    )
}

export default Personal;
