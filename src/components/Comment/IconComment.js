import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';

function IconComment({ avatar, name, created, content, userid, handleDeleteComment }) {
    const user = useSelector(state => state.auth.user);
    const image_cmt = avatar.replace('../', 'https://hdbasicpro.000webhostapp.com/newmedia/');

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
                {user && Number(user.user_id) === Number(userid) && (
                    <button onClick={() => handleDeleteComment(created)}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                )}
            </div>
        </div>
    )
}

export default IconComment;
