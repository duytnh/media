import React, { useState, useEffect } from 'react';
import { ROUTERS } from '../../../../utils/router';
import { Link, useLocation } from "react-router-dom";
import './style.scss';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { debounce } from 'lodash';
import axios from 'axios';
import SearchBox from '../../../../components/Search/SearchBox';


function Header() {
    const [selected, setSelected] = useState(0);
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const alert = useAlert();
    const [searchTerm, setSearchTerm] = useState('');
    const [allUser, setAllUser] = useState([]);
    const location = useLocation();
    const currentPage = location.pathname;
    const page = currentPage.substring(currentPage.lastIndexOf('/') + 1);
    const [showSearch, setShowSearch] = useState(false);

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
            path: ROUTERS.USER.NOTIFY,
            icon: <i className="fa-solid fa-bell"></i>
        },
    ];

    useEffect(() => {
        const savedSelected = localStorage.getItem('selected');
        if (savedSelected) {
            setSelected(Number(savedSelected));
        }
    }, []);

    const debouncedSearch = debounce(async (value) => {
        try {
            const response = await axios.get('https://hdbasicpro.000webhostapp.com/newmedia/api/getAllUser.php', {
                params: {
                    access_token: token,
                    search: value
                }
            });
            if (response.data.status === 200) {
                setAllUser((response.data.data));
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (e) {
            alert.error('Máy chủ không phản hồi');
        }
    }, 500);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value !== '') {
            debouncedSearch(value);
            setShowSearch(true);
        } else {
            setAllUser([]);
            setShowSearch(false);
        }
    };

    const handleClick = (index) => {
        setSelected(index);
        localStorage.setItem('selected', index);
    };

    const handleAddFriend = async (id) => {
        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/addFriend.php', {
                friend_id: id,
                access_token: token,
                action: 'send'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.data.status === 200) {
                alert.success(response.data.message);
                page && page === 'friends' && window.location.reload();
                const updatedAllUser = allUser.map(user => {
                    if (user.user_id === id) {
                        return {
                            ...user,
                            relationship_status: 'sended'
                        };
                    }
                    return user;
                });
                setAllUser(updatedAllUser);
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    }
    const handleAcceptFriend = async (id) => {
        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/addFriend.php', {
                friend_id: id,
                access_token: token,
                action: 'accept'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.data.status === 200) {
                alert.success(response.data.message);
                page && page === 'friends' && window.location.reload();
                const updatedAllUser = allUser.map(user => {
                    if (user.user_id === id) {
                        return {
                            ...user,
                            relationship_status: 'isfriend'
                        };
                    }
                    return user;
                });
                setAllUser(updatedAllUser);

            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    }
    const handleRejectFriend = async (id) => {
        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/addFriend.php', {
                friend_id: id,
                access_token: token,
                action: 'reject'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.data.status === 200) {
                alert.success(response.data.message);
                page && page === 'friends' && window.location.reload();
                const updatedAllUser = allUser.map(user => {
                    if (user.user_id === id) {
                        return {
                            ...user,
                            relationship_status: 'dontfriend'
                        };
                    }
                    return user;
                });
                setAllUser(updatedAllUser);
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    }
    const handleDeleteFriend = async (id) => {
        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/addFriend.php', {
                friend_id: id,
                access_token: token,
                action: 'delete'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.data.status === 200) {
                alert.success(response.data.message);
                page && page === 'friends' && window.location.reload();
                const updatedAllUser = allUser.map(user => {
                    if (user.user_id === id) {
                        return {
                            ...user,
                            relationship_status: 'dontfriend'
                        };
                    }
                    return user;
                });
                setAllUser(updatedAllUser);
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    }

    const closeSearchBox = () => {
        setSearchTerm('');
        setShowSearch(false);
    }

    return (
        <nav className='header'>
            <div className='header-top'>
                <input type='text' value={searchTerm} onChange={handleInputChange} />
                <span><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
            {showSearch && (
                <SearchBox
                    results={allUser}
                    addFriend={handleAddFriend}
                    acceptFriend={handleAcceptFriend}
                    rejectFriend={handleRejectFriend}
                    deleteFriend={handleDeleteFriend}
                    closeBox={closeSearchBox}
                />
            )}
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
                            <Link to={ROUTERS.USER.INFO} className={selected === 'login' ? 'selected' : ''}>
                                <i className="fa-solid fa-user"></i>
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
