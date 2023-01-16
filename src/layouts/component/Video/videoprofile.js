import styles from './ListVideo.module.scss';
import classNames from 'classnames/bind';
import {
    faMusic,
    faPause,
    faPlay,
    faCommentDots,
    faHeart,
    faShare,
    faVolumeLow,
    faVolumeHigh,
    faClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import TippyUser from '@tippyjs/react/headless';
import AcountUsers from '~/component/SuccgestAcount/AcountUser/AcountUsers';
import Button from '~/component/Buttons';
import { createContext, useEffect, useRef, useState } from 'react';
import { useElementOnScreen } from './renderVideo';
import * as zoomVideoService from '~/Service/zoomVideoService';
import { themeContext } from './ListVideo';
import { useContext } from 'react';
import RenderComent from '~/component/RenderComent';
import { creatLikeContext } from './ListVideo';

const cx = classNames.bind(styles);
export const UserContext = createContext();

const NIT_FOLLOW =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MzQyNTk0NiwiZXhwIjoxNjc2MDE3OTQ2LCJuYmYiOjE2NzM0MjU5NDYsImp0aSI6IldnY2xIb3Z4djU5MXZvcFQiLCJzdWIiOjQ3NjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.spXauLlvHbmZKRl77yCXBl2s6uFea89OJPzIotPEkf8';
function VideoProfile({ data }) {
    const [theme, setTheme] = useContext(themeContext);
    const [likeContext, setLikeContext] = useContext(creatLikeContext);
    const videoRef = useRef();
    const currentVloume = useRef();
    const [videoPlay, setVideoPlay] = useState(true);
    const [secontVideo, setSecontVideo] = useState(0);
    const [minuteVideo, setMinuteVideo] = useState(0);
    const [progressBar, setprogressBar] = useState(0);
    const [volumes, setVolumes] = useState(0.5);
    const [active, setActive] = useState({ display: 'block' });
    const [active3, setActive3] = useState({ position: 'relative' });
    const [active1, setActive1] = useState({ display: 'none' });
    const [commentVideo, setCommentVideo] = useState('');
    const [commentCheck, setCommentCheck] = useState(theme);
    const [reloadComent, setReloadComent] = useState(false);

    const handleLikeVideo = () => {
        const api = `https://tiktok.fullstack.edu.vn/api/videos/${data.id}/like`;
        fetch(api, {
            method: 'POST',
            headers: {
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MzQyNTk0NiwiZXhwIjoxNjc2MDE3OTQ2LCJuYmYiOjE2NzM0MjU5NDYsImp0aSI6IldnY2xIb3Z4djU5MXZvcFQiLCJzdWIiOjQ3NjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.spXauLlvHbmZKRl77yCXBl2s6uFea89OJPzIotPEkf8',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.id),
        }).then((data) => console.log(data));
        if (likeContext === true) {
            setLikeContext(false);
        } else {
            setLikeContext(true);
        }
    };

    const handlUnlikeVideo = () => {
        const api = `https://tiktok.fullstack.edu.vn/api/videos/${data.id}/unlike`;
        fetch(api, {
            method: 'POST',
            headers: {
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MzQyNTk0NiwiZXhwIjoxNjc2MDE3OTQ2LCJuYmYiOjE2NzM0MjU5NDYsImp0aSI6IldnY2xIb3Z4djU5MXZvcFQiLCJzdWIiOjQ3NjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.spXauLlvHbmZKRl77yCXBl2s6uFea89OJPzIotPEkf8',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.id),
        }).then((data) => console.log(data));
        if (likeContext === true) {
            setLikeContext(false);
        } else {
            setLikeContext(true);
        }
    };

    useEffect(() => {
        const listComent = data.id;
        zoomVideoService
            .getSuggested({ id: listComent, token: NIT_FOLLOW })
            .then((data) => {
                setCommentVideo(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reloadComent]);

    const handleListCommnet = () => {
        const listComent = data.id;
        zoomVideoService
            .getSuggested({ id: listComent, token: NIT_FOLLOW })
            .then((data) => {
                setCommentVideo(data);
            })
            .catch((error) => {
                console.log(error);
            });

        setCommentCheck(true);
        setTheme(true);
        setReloadComent(true);
    };

    const handleCloseComent = () => {
        setCommentCheck(false);
        setTheme(false);
        videoRef.current.play();
    };

    const handlPlayVideo = () => {
        if (videoPlay) {
            videoRef.current.pause();
            setActive({ display: 'block' });
            setActive1({ display: 'none' });
            setVideoPlay(false);
        } else {
            videoRef.current.play();
            setActive({ display: 'none' });
            setActive1({ display: 'block' });
            setVideoPlay(true);
        }
    };

    const onPlaying = () => {
        const ct = Math.round(videoRef.current.currentTime);
        const duration = data.meta.playtime_seconds;
        const cv = (ct / duration) * 100;
        const timeSong = Math.floor(videoRef.current.currentTime / 60);
        const minute = Math.round(ct - timeSong * 60);
        setSecontVideo(minute);
        setprogressBar(cv);
        if (theme === true) {
            videoRef.current.pause();
        }
    };
    const checkEndvideos = () => {
        videoRef.current.play();
        setSecontVideo(0);
        setMinuteVideo(0);
    };

    useEffect(() => {
        if (secontVideo >= 60) {
            setMinuteVideo(minuteVideo + 1);
        }
    }, [secontVideo]);

    const setCurrenValue = (e) => {
        const volumss = e.target.value;
        setVolumes((videoRef.current.volume = volumss / 100));
    };

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };

    const isVisibile = useElementOnScreen(options, videoRef);
    useEffect(() => {
        if (isVisibile) {
            if (!videoPlay) {
                setActive({ display: 'none' });
                setActive1({ display: 'block' });
                videoRef.current.play();
                setVideoPlay(true);
            }
        } else {
            if (videoPlay) {
                videoRef.current.pause();
                setVideoPlay(false);
                setActive({ display: 'block' });
                setActive1({ display: 'none' });
            }
        }
    }, [isVisibile]);

    return (
        <>
            <div>
                <div className={cx('wrapper')} style={active3}>
                    <NavLink to={`/@${data.user.nickname}`}>
                        <TippyUser
                            offset={[135, 5]}
                            delay={[400, 800]}
                            placement="top"
                            render={(attrs) => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <AcountUsers data={data} />
                                </div>
                            )}
                        >
                            <img className={cx('avatar')} src={data.user.avatar} alt={data.user.nickname} />
                        </TippyUser>
                    </NavLink>

                    <div className={cx('my_video-list')}>
                        <div className={cx('name-list')}>
                            <div className={cx('name-user')}>
                                <h1>{`${data.user.first_name} ${data.user.last_name}`}</h1>
                                <span>{data.user.nickname}</span>
                            </div>
                            <Button ouline className={cx('button_follow')}>
                                {' '}
                                Follow
                            </Button>
                        </div>

                        <div className={cx('bio')}>
                            <span className={cx('last_name')}>{data.user.bio}</span>
                            <strong>{data.description}</strong>
                        </div>
                        <div className={cx('song_name')}>
                            <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
                            <span className={cx('')}>{data.music}</span>
                        </div>
                        <div className={cx('video')}>
                            {theme == true ? (
                                <video
                                    className={cx('my_videoss')}
                                    ref={videoRef}
                                    onClick={handlPlayVideo}
                                    onTimeUpdate={onPlaying}
                                    onEnded={checkEndvideos}
                                >
                                    <source src={data.file_url} alt="" />
                                </video>
                            ) : (
                                <video
                                    className={cx('my_video')}
                                    ref={videoRef}
                                    onClick={handlPlayVideo}
                                    onTimeUpdate={onPlaying}
                                    onEnded={checkEndvideos}
                                >
                                    <source src={data.file_url} alt="" />
                                </video>
                            )}

                            <div className={cx('icon-playPause')} onClick={handlPlayVideo}>
                                <FontAwesomeIcon className={cx('play')} style={active} icon={faPlay} />
                                <FontAwesomeIcon className={cx('pause')} style={active1} icon={faPause} />
                            </div>
                            <div className={cx('input_time')}>
                                <div className={cx('input-child')} style={{ width: `${progressBar}%` }}></div>
                            </div>

                            <div className={cx('time-video')}>
                                <div>
                                    <span>{minuteVideo}</span>:{secontVideo < 10 && <span>{`0${secontVideo}`}</span>}
                                    {secontVideo >= 10 && <span>{secontVideo}</span>}
                                </div>
                                /
                                <div>
                                    <span>{data.meta.playtime_string}</span>
                                </div>
                            </div>

                            <div className={cx('icon-volume')}>
                                <div>
                                    <input
                                        className={cx('volums')}
                                        ref={currentVloume}
                                        onChange={setCurrenValue}
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        orient="vertical"
                                    />
                                </div>
                                <div className={cx('fa-volum')}>
                                    {volumes < 0.5 && (
                                        <div className={cx('font-volume')}>
                                            <FontAwesomeIcon icon={faVolumeLow} />
                                        </div>
                                    )}

                                    {volumes >= 0.5 && (
                                        <div className={cx('font-volume')}>
                                            <FontAwesomeIcon icon={faVolumeHigh} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={cx('icon')}>
                                {data.is_liked === true ? (
                                    <div>
                                        <FontAwesomeIcon
                                            style={{ color: 'red' }}
                                            className={cx('icon-heart')}
                                            icon={faHeart}
                                            onClick={handlUnlikeVideo}
                                        />
                                        <span className={cx('view_count')}>{`${data.likes_count}`}</span>
                                    </div>
                                ) : (
                                    <div>
                                        <FontAwesomeIcon
                                            className={cx('icon-heart')}
                                            icon={faHeart}
                                            onClick={handleLikeVideo}
                                        />
                                        <span className={cx('view_count')}>{`${data.likes_count}`}</span>
                                    </div>
                                )}

                                <div onClick={handleListCommnet}>
                                    <FontAwesomeIcon className={cx('icon-dots')} icon={faCommentDots} />
                                    <span className={cx('view_count')}>{`${data.comments_count}`}</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon className={cx('icon-sheare')} icon={faShare} />
                                    <span className={cx('view_count')}>{data.shares_count}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {commentCheck === true && (
                        <div className={cx('coment-video-usser')}>
                            <button className={cx('button-close')} onClick={handleCloseComent}>
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                            <UserContext.Provider value={[reloadComent, setReloadComent]}>
                                <RenderComent data={data} key={data.user.id} commentVideo={commentVideo} />
                            </UserContext.Provider>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default VideoProfile;
