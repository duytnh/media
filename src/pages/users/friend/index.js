import React, { useEffect, useState } from 'react'
import IconSendFriend from '../../../components/IconFriend/IconSendFriend';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './style.scss'
import IconFriendPage from '../../../components/IconFriend/IconFriendPage';

const Friend = () => {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const [friends, setFriends] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [error, setError] = useState('');
    const [errorAllFriend, setErrorAllFriend] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const alert = useAlert();

    useEffect(() => {
        const fetchSendFriend = async () => {
            try {
                const response = await axios.get('https://hdbasicpro.000webhostapp.com/newmedia/api/getSendFriend.php', {
                    params: {
                        access_token: token
                    }
                });
                if (response.data.status === 200) {
                    setFriends((response.data.data));
                } else if (response.data.status === 201) {
                    setError(response.data.message);
                } else if (response.data.status === 400) {
                    alert.error(response.data.message);
                }
            } catch (e) {
                alert.error('Máy chủ không phản hồi');
            }
        };
        fetchSendFriend();
    }, [alert, token]);

    useEffect(() => {
        const fetchAllFriend = async (page) => {
            try {
                const response = await axios.get('https://hdbasicpro.000webhostapp.com/newmedia/api/getAllFriend.php', {
                    params: {
                        access_token: token,
                        page: page
                    }
                });
                if (response.data.status === 200) {
                    const newAllFriends = response.data.data;
                    setAllFriends((prevAllFriends) => [...prevAllFriends, ...newAllFriends]);
                    if (newAllFriends.length < 10) {
                        setHasMore(false);
                    }
                } else if (response.data.status === 201) {
                    setErrorAllFriend(response.data.message);
                } else if (response.data.status === 400) {
                    alert.error(response.data.message);
                }
            } catch (e) {
                alert.error('Máy chủ không phản hồi');
            } finally {
                setLoading(false);
            }
        };
        fetchAllFriend(page);
    }, [alert, page, token]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

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
                const acceptedFriend = friends.find(friend => friend.user_id === id);
                setFriends(friends.filter(friend => friend.user_id !== id));
                setAllFriends([acceptedFriend, ...allFriends]);
                setErrorAllFriend('');
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    };

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
                setFriends(friends.filter(friend => friend.friend_id !== id)); // Loại bỏ bạn bè đã từ chối khỏi danh sách
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    };

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
                setAllFriends(allFriends.filter(friend => friend.friend_id !== id));
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi: ' + error.message);
        }
    };

    return (
        <div className='friends-page'>
            <h5>Lời mời kết bạn</h5>
            {error && (<h6>{error}</h6>)}
            {friends.map((friend, index) => {
                return (
                    <IconSendFriend
                        key={index}
                        name={friend.fullname}
                        image={friend.avatar_url.replace('../', 'https://hdbasicpro.000webhostapp.com/newmedia/')}
                        id={friend.user_id}
                        acceptFriend={handleAcceptFriend}
                        rejectFriend={handleRejectFriend}
                    />
                )
            })}

            <hr></hr>
            <h5>Bạn bè</h5>
            {allFriends.map((all, index) => {
                return (
                    <IconFriendPage
                        key={index}
                        name={all.fullname}
                        image={all.avatar_url.replace('../', 'https://hdbasicpro.000webhostapp.com/newmedia/')}
                        id={all.friend_id}
                        deleteFriend={handleDeleteFriend}
                    />
                )
            })}

            {errorAllFriend && (<h6>{errorAllFriend}</h6>)}
            {loading && <p>Loading...</p>}
            {!errorAllFriend && hasMore && !loading ? (<button className='btn-more' onClick={handleLoadMore}><i className="fa-solid fa-circle-chevron-down"></i></button>) : ('')}
        </div>
    )
}

Friend.displayName = 'Friend';
export default Friend
