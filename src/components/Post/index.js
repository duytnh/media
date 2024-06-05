import React, { useEffect, useState } from 'react';
import './style.scss';
import Comment from '../Comment';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Post({ user_avatar, user_fullname, created_at, description, images, total_likes, total_comments, comments, image_ids, userId_post, deletePost }) {
    const [imageClass, setImageClass] = useState('');
    const [openComment, setOpenComment] = useState(false);
    const [like, setLike] = useState(false);
    const [numLike, setNumLike] = useState(total_likes);
    const [numComment, setNumComment] = useState(total_comments);
    const image_auth = user_avatar.replace('../', 'https://hdbasicpro.000webhostapp.com/newmedia/');
    const alert = useAlert();
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const userId = user && user.user_id;
    const [comment, setComment] = useState('');
    const [listComments, setListComments] = useState(comments);
    const [avatarComment, setAvatarComment] = useState('');
    const [nameComment, setNameComment] = useState('');

    useEffect(() => {
        const fetchLike = async () => {
            try {
                const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/checkLikeImage.php', {
                    image_ids: image_ids,
                    access_token: token
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                if (response.data.status === 200) {
                    setLike(true);
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

        fetchLike();
    }, [alert, image_ids, token]);

    const handleOpenComment = () => {
        setOpenComment(!openComment);
    }

    const handleLikeDisLike = async () => {
        if (!like) {
            try {
                const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/likeImage.php', {
                    image_ids: image_ids,
                    access_token: token
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                if (response.data.status === 200) {
                    setLike(true);
                    setNumLike(prevNumLike => prevNumLike + 1);
                    alert.success(response.data.message);
                } else if (response.data.status === 400) {
                    setLike(false);
                    alert.error(response.data.message);
                }
            } catch (error) {
                console.log('Lỗi: ' + error.message);
            }
        } else {
            try {
                const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/dislikeImage.php', {
                    image_ids: image_ids,
                    access_token: token
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                if (response.data.status === 200) {
                    setLike(false);
                    setNumLike(prevNumLike => prevNumLike - 1);
                    alert.success(response.data.message);
                } else if (response.data.status === 400) {
                    setLike(true);
                    alert.error(response.data.message);
                }
            } catch (error) {
                console.log('Lỗi: ' + error.message);
            }
        }
    }

    useEffect(() => {
        switch (images.length) {
            case 1:
                setImageClass('one-image');
                break;
            case 2:
                setImageClass('two-images');
                break;
            case 3:
                setImageClass('three-images');
                break;
            case 4:
                setImageClass('four-images');
                break;
            default:
                setImageClass('');
        }
    }, [images.length]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('https://hdbasicpro.000webhostapp.com/newmedia/api/getUser.php', {
                    params: {
                        access_token: token
                    }
                });
                if (response.data.status === 200) {
                    setAvatarComment(response.data.data.avatar_url.replace('../', 'https://hdbasicpro.000webhostapp.com/newmedia/'));
                    setNameComment(response.data.data.fullname);
                } else if (response.data.status === 400) {
                    alert.error(response.data.message);
                }
            } catch (error) {
                console.log('Lỗi: ' + error.message);
            }
        };

        fetchProfile();
    }, [alert, token]);


    const handleAddComment = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/addCommentImage.php', {
                image_ids: image_ids,
                access_token: token,
                comment: comment
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.data.status === 200) {
                alert.success(response.data.message);
                setNumComment(prevNumComment => prevNumComment + 1);
                setListComments(prevListComments => [{ avatar_url: avatarComment, fullname: nameComment, comment: comment, user_id: user.user_id }, ...prevListComments]);
                setComment('');
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    }

    const deleteCommentImage = async (created_at) => {
        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/deleteCommentImage.php', {
                created_at: created_at,
                access_token: token
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.data.status === 200) {
                alert.success(response.data.message);
                setNumComment(prevNumComment => prevNumComment - 1);
                setListComments(prevListComments => prevListComments.filter(comment => comment.created_at !== created_at));
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    }

    return (
        <div className='post'>
            <div className='post-header'>
                <img src={image_auth} alt="Avatar" />
                <div className='info-post'>
                    <h6>{user_fullname}</h6>
                    <p>{created_at}</p>
                </div>
                {userId_post === userId && (<button onClick={() => deletePost(image_ids)}><i className="fa-solid fa-trash-can"></i></button>)}
            </div>
            <p className='description'>{description}</p>
            <div className='post-content'>
                <div className={`post-images ${imageClass}`}>
                    {images.map((src, index) => {
                        const image_content = src.replace('../', 'https://hdbasicpro.000webhostapp.com/newmedia/');
                        return (
                            <img key={index} src={image_content} alt={`Hình ảnh ${index + 1}`} />
                        );
                    })}

                </div>
            </div>
            <div className='post-footer'>
                <div className='number-post'>
                    <p><i className="fa-solid fa-heart"></i> {numLike}</p>
                    <p>{numComment}</p>
                </div>
                <u></u>
                <div className='button-post'>
                    <button onClick={handleLikeDisLike} className='likeBtn'>
                        {like
                            ? (<i className="fa-solid fa-heart" style={{ color: 'red' }}></i>)
                            : (<i className="fa-regular fa-heart" style={{ color: 'red' }}></i>)} {like ? (<span style={{ color: 'red' }}>Thích</span>) : (<span>Thích</span>)}
                    </button>
                    <button onClick={handleOpenComment}><i className="fa-regular fa-comment"></i> Bình luận</button>
                </div>
            </div>
            {openComment && (
                <div className='post-bottom-comment'>
                    <div className='add-comment'>
                        <form className='add-comment-form' onSubmit={handleAddComment}>
                            <input type='text' placeholder='Hãy nói gì đó!' value={comment} required onChange={(e) => setComment(e.target.value)} />
                            <button type='submit'><i className="fa-regular fa-paper-plane"></i></button>
                        </form>
                    </div>
                    {listComments.map((cmt, index) => (
                        <Comment
                            key={index}
                            avatar_url={cmt.avatar_url}
                            fullname={Number(cmt.user_id) === userId ? 'Bạn' : cmt.fullname}
                            created_at={cmt.created_at}
                            comment={cmt.comment}
                            id_user_comment={Number(cmt.user_id)}
                            deleteComment={deleteCommentImage}
                        >
                        </Comment>
                    ))}
                </div>
            )}
        </div >
    )
}

export default Post;
