import React from 'react'
import IconComment from './IconComment'

function Comment({ avatar_url, fullname, created_at, comment, id_user_comment }) {
    return (
        <div className='comments'>
            <div className='list-comment'>
                <IconComment
                    avatar={avatar_url}
                    name={fullname}
                    created={created_at}
                    content={comment}
                    user_id={id_user_comment}
                />
            </div>
        </div>
    )
}

export default Comment
