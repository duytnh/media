import React from 'react'
import './style.scss'

function Notification({ name, image, created, message }) {
    return (
        <div className='notify-box'>
            <img src={image} alt='Ảnh người thông báo' />
            <div className='notify-content'>
                <h6>{name}</h6>
                <span>{created}</span>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Notification
