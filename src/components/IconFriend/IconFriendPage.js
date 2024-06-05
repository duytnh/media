import React from 'react'
import { useNavigate } from 'react-router-dom';

function IconFriendPage({ image, name, id, deleteFriend }) {
    const navigate = useNavigate();
    const detailsUser = () => {
        navigate(`/detailsUser/${id}`);
    }
    return (
        <div className='icon-friend'>
            <div className='friend-info' onClick={detailsUser}>
                <img src={image} alt='ảnh' />
                <p>{name}</p>
            </div>
            <div className='btnFriend'>
                <button onClick={() => deleteFriend(id)}><i className="fa-solid fa-user-minus"></i> Hủy kết bạn</button>
            </div>
        </div>
    )
}

export default IconFriendPage
