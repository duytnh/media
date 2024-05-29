import React, { useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert'

function ChangePassword() {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const alert = useAlert()

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (code === '' || password === '') {
            alert.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/changePassword.php', {
                code: code,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.status === 200) {
                alert.success(response.data.message);
                navigate("/login");
            } else if (response.data.status === 500) {
                alert.error(response.data.message);
            }

        } catch (error) {
            if (error.response) {
                console.log('Lỗi phản hồi từ máy chủ: ' + error.response.data);
            } else if (error.request) {
                console.log('Lỗi yêu cầu:', error.request);
            } else {
                console.log('Lỗi: ' + error.message);
            }
        }
    }
    return (
        <div className='box-change-password'>
            <h5>THAY ĐỔI MẬT KHẨU</h5>
            <div className='change-password'>
                <img src='./reset-password.png' alt='Reset password' />
                <form className='change-password-form'>
                    <input type='number' placeholder='Mã xác nhận...' required onChange={(e) => setCode(e.target.value)} />
                    <input type='password' placeholder='Mật khẩu mới...' required onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleChangePassword}>LƯU</button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
