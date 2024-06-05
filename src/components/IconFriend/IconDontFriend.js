import React from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

function IconDontFriend({ name, image, id, addFriend }) {
    const navigate = useNavigate();
    const detailsUser = () => {
        navigate(`/detailsUser/${id}`);
    }
    return (
        <div className='icon-dont-friend'>
            <div className='dont-friend-info' onClick={detailsUser}>
                <img src={image} alt='ảnh' />
                <p>{name}</p>
            </div>
            <div className='btn-add-friend'>
                <button onClick={() => addFriend(id)}><i className="fa-solid fa-user-plus"></i> Thêm bạn</button>
            </div>
        </div>
    )
}

export default IconDontFriend
