import React, { useEffect, useState } from 'react'
import './style.scss'
import Comment from '../Comment';

function Post({ user_avatar, user_fullname, created_at, description, images, total_likes, total_comments, comments }) {
    const [imageClass, setImageClass] = useState('');
    const [openComment, setOpenComment] = useState(false);
    const [like, setLike] = useState(false);
    const baseUrl = 'https://hdbasicpro.000webhotapp.com/newmedia';
    const image_auth = new URL(user_avatar, baseUrl).href;

    const handleOpenComment = () => {
        openComment ? setOpenComment(false) : setOpenComment(true);
    }

    const handleLikeDisLike = () => {
        like ? setLike(false) : setLike(true);
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

    return (
        <div className='post'>
            <div className='post-header'>
                <img src={image_auth} alt="Avatar" />
                <div className='info-post'>
                    <h6>{user_fullname}</h6>
                    <p>{created_at}</p>
                </div>
            </div>
            <p className='description'>{description}</p>
            <div className='post-content'>
                <div className={`post-images ${imageClass}`}>
                    {images.map((src, index) => {
                        const image_content = new URL(src, baseUrl).href;
                        return (
                            <img key={index} src={image_content} alt={`Image ${index + 1}`} />
                        );
                    })}

                </div>
            </div>
            <div className='post-footer'>
                <div className='number-post'>
                    <p><i className="fa-solid fa-heart"></i> {total_likes}</p>
                    <p>{total_comments}</p>
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
                        <form className='add-comment-form'>
                            <input type='text' placeholder='Hãy nói gì đó !' required />
                            <button><i className="fa-regular fa-paper-plane"></i></button>
                        </form>
                    </div>
                    {comments.map((cmt, index) => (
                        <Comment
                            key={index}
                            avatar_url={cmt.avatar_url}
                            fullname={cmt.fullname}
                            created_at={cmt.created_at}
                            comment={cmt.comment}
                            id_user_comment={cmt.user_id}
                        >
                        </Comment>
                    ))}
                </div>
            )}
        </div >
    )
}

export default Post;
