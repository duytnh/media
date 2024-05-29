import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../../../redux/authAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert()

    useEffect(() => {
        const inP = document.querySelectorAll('.input-field');

        inP.forEach(input => {
            input.addEventListener('blur', function () {
                if (!this.value) {
                    this.parentElement.classList.remove('focus');
                } else {
                    this.parentElement.classList.add('focus');
                }
            });

            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focus');
                document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.f_row').forEach(row => row.classList.remove('shake'));
            });
        });

        document.querySelectorAll('.resetTag').forEach(tag => {
            tag.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector('.formBox').classList.add('level-forget');
                document.querySelector('.formBox').classList.remove('level-reg');
            });
        });

        document.querySelectorAll('.back').forEach(back => {
            back.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector('.formBox').classList.remove('level-forget');
                document.querySelector('.formBox').classList.add('level-login');
            });
        });

        document.querySelectorAll('.regTag').forEach(tag => {
            tag.addEventListener('click', function (e) {
                e.preventDefault();
                const formBox = document.querySelector('.formBox');
                formBox.classList.remove('level-reg-revers');
                formBox.classList.toggle('level-login');
                formBox.classList.toggle('level-reg');
                if (!formBox.classList.contains('level-reg')) {
                    formBox.classList.add('level-reg-revers');
                }
            });
        });

        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const finp = this.parentElement.querySelector('input');
                if (finp.value) {
                    this.classList.add('active');
                }
                setTimeout(() => {
                    inP.forEach(input => input.value = '');
                    document.querySelectorAll('.f_row').forEach(row => row.classList.remove('shake', 'focus'));
                    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
                }, 2000);
                if (!finp.value) {
                    finp.parentElement.classList.add('shake');
                }
            });
        });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            alert.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/login.php', {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.status === 200) {
                dispatch(loginSuccess(response.data));
                alert.success(response.data.message);
                navigate("/");
            } else if (response.data.status === 400 || response.data.status === 401 || response.data.status === 500) {
                dispatch(loginFailure(response.data.message));
                alert.error(response.data.message);
            }

        } catch (error) {
            if (error.response) {
                console.log('Lỗi phản hồi từ máy chủ: ' + error.response.data);
            } else if (error.request) {
                alert.error('Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra lại kết nối.');
                console.log('Lỗi yêu cầu:', error.request);
            } else {
                console.log('Lỗi: ' + error.message);
            }
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (email === '') {
            alert.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/sendCodePassword.php', {
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.status === 200) {
                alert.success(response.data.message);
                navigate("/change-password");
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
        <div className='login'>
            <div className="container">
                <div className="formBox level-login">
                    <div className="box boxShaddow"></div>
                    <div className="box loginBox">
                        <h2>LOGIN</h2>
                        <form className="form" method='POST'>
                            <div className="f_row">
                                <label>Username</label>
                                <input type="text" className="input-field" required onChange={(e) => setUsername(e.target.value)} />
                                <u></u>
                            </div>
                            <div className="f_row last">
                                <label>Password</label>
                                <input type="password" className="input-field" required onChange={(e) => setPassword(e.target.value)} />
                                <u></u>
                            </div>
                            <button className="btn" onClick={handleLogin}><span>GO</span>
                                <u></u>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 415.582 415.582">
                                    <path d="M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064
                                      c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31
                                      c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925
                                      C415.582,102.628,414.103,99.059,411.47,96.426z"/>
                                </svg>
                            </button>
                            <div className="f_link">
                                <p className="resetTag">Forgot your password?</p>
                            </div>
                        </form>
                    </div>
                    <div className="box forgetbox">
                        <p className="back icon-back">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.404 199.404">
                                <polygon points="199.404,81.529 74.742,81.529 127.987,28.285 99.701,0 0,99.702 99.701,199.404 127.987,171.119 74.742,117.876 
		199.404,117.876 "/>
                            </svg>
                        </p>
                        <h2>Reset Password</h2>
                        <form className="form">
                            <p>Có cái mật khẩu cũng quên. Nhập email bữa đăng ký vô rồi làm theo hương dẫn để đặt lại mật khẩu. Còn quên email nữa thì chịu luôn. Liên hệ admin để nó reset lại cho.</p>
                            <div className="f_row last">
                                <label>Email</label>
                                <input type="text" className="input-field" required onChange={(e) => setEmail(e.target.value)} />
                                <u></u>
                            </div>
                            <button className="btn" onClick={handleResetPassword}><span>Reset</span>
                                <u></u>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 415.582 415.582">
                                    <path d="M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064
                                      c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31
                                      c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925
                                      C415.582,102.628,414.103,99.059,411.47,96.426z"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="box registerBox">
                        <span className="reg_bg"></span>
                        <h2>Register</h2>
                        <form className="form">
                            <div className="f_row">
                                <label>Username</label>
                                <input type="text" className="input-field" required />
                                <u></u>
                            </div>
                            <div className="f_row">
                                <label>Email</label>
                                <input type="email" className="input-field" required />
                                <u></u>
                            </div>
                            <div className="f_row last">
                                <label>Password</label>
                                <input type="password" className="input-field" required />
                                <u></u>
                            </div>
                            <button className="btn-large">NEXT</button>
                        </form>
                    </div>
                    <p className="regTag icon-add">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 357">
                            <path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z" />
                        </svg>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
