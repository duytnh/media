import React, { useEffect, useState } from 'react'
import './style.scss'
import Notification from '../../../components/Notifications/Notification'
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import axios from 'axios';

function Notificate() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const alert = useAlert();
    const [notifys, setNotifys] = useState([]);

    useEffect(() => {
        const fetchNotify = async () => {
            try {
                const response = await axios.get('https://hdbasicpro.000webhostapp.com/newmedia/api/getNotify.php', {
                    params: {
                        access_token: token
                    }
                });
                if (response.data.status === 200) {
                    setNotifys(response.data.notifications);
                } else if (response.data.status === 400) {
                    alert.error(response.data.message);
                }
            } catch (e) {
                alert.error('Máy chủ không phản hồi');
            }
        };
        fetchNotify();
    }, [alert, token]);

    return (
        <div className='notify'>
            <h5>Thông báo</h5>
            {notifys ? notifys.map((item, index) => {
                return (
                    <Notification
                        key={index}
                        name={item.fullname}
                        image={item.avatar_url && item.avatar_url.replace('../', 'https://hdbasicpro.000webhostapp.com/newmedia/')}
                        message={item.message}
                        created={item.created_at}
                    />
                )
            }) : <span style={{ paddingBottom: '30px !important' }}>Không có thông báo nào</span>}
        </div>
    )
}

export default Notificate
