import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Sidebar from '~/layouts/component/Sidebar';
import styles from './profile.module.scss';
import * as profileService from '~/Service/profileService';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '~/component/Buttons';
import VideoUserList from '~/component/VideoUser';

const cx = classNames.bind(styles);
const NIT_FOLLOW =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MzQyNTk0NiwiZXhwIjoxNjc2MDE3OTQ2LCJuYmYiOjE2NzM0MjU5NDYsImp0aSI6IldnY2xIb3Z4djU5MXZvcFQiLCJzdWIiOjQ3NjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.spXauLlvHbmZKRl77yCXBl2s6uFea89OJPzIotPEkf8';

function Profile() {
    const { nickname } = useParams();
    const [loggerData, setLoggerData] = useState('');
    const [userData, setUserData] = useState('');

    const [listVideo, setListVideo] = useState(true);
    const [clickAutovideo, setClickAutoVideo] = useState({ borderBottom: '3px solid rgb(26, 25, 25)' });
    const [clickAutovideos, setClickAutoVideos] = useState({
        borderBottom: 'none',
    });

    useEffect(() => {
        profileService
            .getSuggested({ token: NIT_FOLLOW })
            .then((data) => {
                setLoggerData(data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios
            .get(`https://tiktok.fullstack.edu.vn/api/users/@${nickname}`)
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleListVideoUser = () => {
        setListVideo(true);
        setClickAutoVideo({ borderBottom: '3px solid rgb(26, 25, 25)' });
        setClickAutoVideos({ borderBottom: 'none' });
    };
    const handleSetListVideo = () => {
        setListVideo(false);
        setClickAutoVideo({ borderBottom: 'none' });
        setClickAutoVideos({ borderBottom: '3px solid rgb(26, 25, 25)' });
    };
    return (
        <div>
            <div className={cx('sidebar-loggin')}>
                <Sidebar iten={false} />
            </div>

            <div>
                <div className={cx('my-profile')}>
                    <div className={cx('user-pro')}>
                        {userData !== '' ? (
                            <img src={userData.data.data.avatar} className={cx('my-avatar')} />
                        ) : (
                            <img
                                src="https://tse4.explicit.bing.net/th?id=OIP.mmIhOpaqJFJNYXruw2Nv4QHaHR&pid=Api&P=0"
                                className={cx('my-avatar')}
                            />
                        )}

                        {userData !== '' ? (
                            <div className={cx('bio')}>
                                <h1
                                    className={cx('fwbio')}
                                >{`${userData.data.data.first_name} ${userData.data.data.last_name}`}</h1>

                                <h3 className={cx('fwbios')}>{userData.data.data.bio}</h3>
                                <Button className={cx('button-follower')} large primary>
                                    Follower
                                </Button>
                            </div>
                        ) : (
                            <div className={cx('bio')}>
                                <h1 className={cx('fwbio')}>{`${loggerData.first_name} ${loggerData.last_name}`}</h1>
                                <h3 className={cx('fwbios')}>{loggerData.bio}</h3>
                                <Button className={cx('button-follower')} large primary>
                                    Follower
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className={cx('follower')}>
                        <div className={cx('user-follow')}>
                            {userData !== '' ? (
                                <h1 className={cx('like-user')}>{userData.data.data.likes_count}</h1>
                            ) : (
                                <h1 className={cx('like-user')}>{loggerData.likes_count}</h1>
                            )}

                            <span> Đang Follow</span>
                        </div>
                        <div className={cx('user-follow')}>
                            {userData !== '' ? (
                                <h1 className={cx('like-user')}>{userData.data.data.followers_count}</h1>
                            ) : (
                                <h1 className={cx('like-user')}>{loggerData.likes_count}</h1>
                            )}
                            <span>Follower</span>
                        </div>
                        <div className={cx('user-follow')}>
                            {userData !== '' ? (
                                <h1 className={cx('like-user')}>{userData.data.data.followings_count}</h1>
                            ) : (
                                <h1 className={cx('like-user')}>{loggerData.likes_count}</h1>
                            )}
                            <span>Thích</span>
                        </div>
                    </div>
                    {userData !== '' ? (
                        <div style={{ display: 'grid', padding: '1 16px', marginTop: '0px' }}>
                            <span>{userData.data.data.created_at}</span>
                            <span>{`Sales@${userData.data.data.first_name} ${userData.data.data.last_name}`}</span>
                            <span>{userData.data.data.nickname}</span>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', padding: '1 16px', marginTop: '0px' }}>
                            <span>{loggerData.email}</span>
                            <span>{`Sales@${loggerData.first_name} ${loggerData.last_name}`}</span>
                            <span>{loggerData.nickname}</span>
                        </div>
                    )}
                </div>

                <div className={cx('buttonInVideo')}>
                    <button className={cx('button-video')} style={clickAutovideo} onClick={handleListVideoUser}>
                        Video Của Tôi
                    </button>
                    <button className={cx('button-videos')} style={clickAutovideos} onClick={handleSetListVideo}>
                        Video Đã Thích
                    </button>
                </div>

                {userData !== '' ? (
                    <div className={cx('list-videos')}>
                        {listVideo ? (
                            userData.data.data.videos.map((video) => {
                                return <VideoUserList key={video.id} data={video.file_url} />;
                            })
                        ) : (
                            <div className={cx('tym-video')}>Người Dùng Này Đã Ẩn Video Đã Thích !</div>
                        )}
                    </div>
                ) : (
                    <div className={cx('list-videos')}>
                        {listVideo ? (
                            <div className={cx('tym-video')}>Người Dùng Này Chưa Đăng Video Nào ! </div>
                        ) : (
                            <div className={cx('tym-video')}>Người Dùng Này Đã Ẩn Video Đã Thích ! </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
