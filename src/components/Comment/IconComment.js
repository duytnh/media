import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';

function IconComment({ avatar, name, created, content, user_id }) {
    const user = useSelector(state => state.auth.user);
    const image_cmt = avatar.replace('../', 'https://hdbasicpro.000webhotapp.com/newmedia/');

    const handleDeleteComment = () => {
        if (user.user_id === user_id) {

        }
    }

    return (
        <div className='icon-comment'>
            <div className='info-comment'>
                <img src={image_cmt} alt='Ảnh user comment' />
                <div className='auth-comment'>
                    <h6>{name}</h6>
                    <p>{created}</p>
                </div>
            </div>
            <div className='content-comment'>
                <p>{content}</p>
                {user && user.user_id === user_id && (
                    <button onClick={handleDeleteComment}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                )}
            </div>
        </div>
    )
}

export default IconComment;
