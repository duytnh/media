import React from 'react'
import IconSended from '../IconFriend/IconSended'
import IconSendFriend from '../IconFriend/IconSendFriend'
import IconFriendPage from '../IconFriend/IconFriendPage'
import IconDontFriend from '../IconFriend/IconDontFriend'
import './style.scss';

function SearchBox({ results, acceptFriend, rejectFriend, deleteFriend, addFriend, closeBox }) {
    return (
        <div className='search-box'>
            {results && results.map((item, index) => {
                const avatar = item.avatar_url && item.avatar_url.replace('../', 'https://hdbasicpro.000webhostapp.com/newmedia/');
                return (
                    <div className='search-item' key={index} onClick={closeBox}>
                        {item.relationship_status === 'sended'
                            ? (<IconSended image={avatar} name={item.fullname} id={item.user_id} />)
                            : item.relationship_status === 'issend'
                                ? (<IconSendFriend name={item.fullname} image={avatar} id={item.user_id} acceptFriend={acceptFriend} rejectFriend={rejectFriend} />)
                                : item.relationship_status === 'isfriend'
                                    ? (<IconFriendPage id={item.user_id} name={item.fullname} image={avatar} deleteFriend={deleteFriend} />)
                                    : (<IconDontFriend id={item.user_id} name={item.fullname} image={avatar} addFriend={addFriend} />)
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default SearchBox
