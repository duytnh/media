import React, { useState, useEffect } from 'react';
import { ROUTERS } from '../../../../utils/router';
import { Link, useNavigate } from "react-router-dom";
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../redux/authAction';
import { useAlert } from 'react-alert'


function Header() {
    const [selected, setSelected] = useState(0);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutClicked, setLogoutClicked] = useState(false);
    const alert = useAlert();

    const data = [
        {
            path: ROUTERS.USER.HOME,
            icon: <i className="fa-regular fa-newspaper"></i>
        },
        {
            path: ROUTERS.USER.FRIENDS,
            icon: <i className="fa-solid fa-user-group"></i>
        },
        {
            path: ROUTERS.USER.PICTURES,
            icon: <i className="fa-solid fa-image"></i>
        },
        {
            name: 'Information',
            path: ROUTERS.USER.INFO,
            icon: <i className="fa-solid fa-user"></i>
        },
    ];

    useEffect(() => {
        const savedSelected = localStorage.getItem('selected');
        if (savedSelected) {
            setSelected(Number(savedSelected));
        }
    }, []);



    const handleLogout = async () => {
        setSelected('login');
        console.log(logoutClicked);

        dispatch(logout());
        alert.success('Đăng xuất thành công');
        navigate("/login");
        setLogoutClicked(true);
    };

    const handleClick = (index) => {
        setSelected(index);
        localStorage.setItem('selected', index);
        if (index === 'logout') {
            setLogoutClicked(true);
        }
    };

    return (
        <nav className='header'>
            <div className='header-top'>
                <form className='search-form'>
                    <input type='search' />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
            <div className='header-bottom'>
                <ul>
                    {data.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleClick(index)}
                        >
                            <Link to={item.path} className={selected === index ? 'selected' : ''}>
                                {item.icon}
                            </Link>
                        </li>
                    ))}
                    <li>
                        {user != null ? (
                            <Link onClick={handleLogout} to={ROUTERS.ADMIN.LOGOUT}>
                                <i className="fa-solid fa-user-xmark"></i>
                            </Link>
                        ) : (
                            <Link onClick={() => handleClick('login')} to={ROUTERS.ADMIN.LOGIN} className={selected === 'login' ? 'selected' : ''}>
                                <i className="fa-solid fa-right-to-bracket"></i>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
