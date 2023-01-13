import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
    faCode,
    faCommentDots,
    faHeart,
    faMusic,
    faPaperPlane,
    faPhone,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Button from '../Buttons';
import CommentVideo from '../CoomentVideo';
import styles from './renderComent.module.scss';
import { UserContext } from '~/layouts/component/Video/videoprofile';
import { Link, Router } from 'react-router-dom';

const cx = classNames.bind(styles);
export const CheckComentContext = createContext();
export const handConetxt = createContext();
function RenderComent({ data, commentVideo }) {
    const focusComment = useRef();
    const [userReload, setUserReload] = useContext(UserContext);
    const [returnPathComent, setReturnPathComent] = useState(false);
    const [comment, setComment] = useState('');

    const handleAddcomment = () => {
        focusComment.current.focus();
        if (userReload === false) {
            setUserReload(true);
        } else if (userReload === true) {
            setUserReload(false);
        }
        const coment = { comment };
        const api = `https://tiktok.fullstack.edu.vn/api/videos/${data.id}/comments`;
        const config = {
            method: 'POST',
            headers: {
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MzQyNTk0NiwiZXhwIjoxNjc2MDE3OTQ2LCJuYmYiOjE2NzM0MjU5NDYsImp0aSI6IldnY2xIb3Z4djU5MXZvcFQiLCJzdWIiOjQ3NjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.spXauLlvHbmZKRl77yCXBl2s6uFea89OJPzIotPEkf8',
                'Content-Type': 'application/json',
                'Content-Length': '<calculated when request is sent>',
                Host: '<calculated when request is sent>',
                'User-Agent': 'PostmanRuntime/7.29.2',
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                Connection: 'keep-alive',
            },
            body: JSON.stringify(coment),
        };

        fetch(api, config)
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
        setComment('');
    };
    return (
        <div>
            <div className={cx('video-comment')}>
                <div className={cx('width-video-comment')}>
                    <div className={cx('my_videoss')}>
                        <video className={cx('my_videos')} controls>
                            <source src={data.file_url} alt="" />
                        </video>
                    </div>
                </div>

                <div className={cx('in-comment')}>
                    <div>
                        <div className={cx('name-list')} style={{ marginLeft: '-56px', marginTop: '-10px' }}>
                            <Link to={`/@${data.user.nickname}`}>
                                <img className={cx('avatar')} src={data.user.avatar} alt={data.user.nickname} />
                            </Link>

                            <div className={cx('name-users')} style={{ marginLeft: '-20px', marginTop: '7px' }}>
                                <h1>{`${data.user.first_name} ${data.user.last_name}`}</h1>
                                <span>{data.user.nickname}</span>
                            </div>
                            <Button ouline className={cx('button_follow')}>
                                {' '}
                                Follow
                            </Button>
                        </div>
                    </div>

                    <div className={cx('bio')} style={{ display: 'block', marginTop: '12px' }}>
                        <span className={cx('last_names')}>{data.user.bio}</span>
                        <strong style={{ display: 'block', marginLeft: '30px' }}>{data.description}</strong>

                        <div className={cx('song_name')} style={{ marginLeft: '30px' }}>
                            <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
                            <span className={cx('')}>{data.music}</span>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <>
                                <div className={cx('border-icon')} style={{ display: 'flex' }}>
                                    <FontAwesomeIcon className={cx('icons')} icon={faHeart} />

                                    <span className={cx('view_count')}>{`${data.likes_count}`}</span>
                                </div>
                                <div className={cx('border-icon')} style={{ display: 'flex', marginLeft: '25px' }}>
                                    <FontAwesomeIcon className={cx('icons')} icon={faCommentDots} />
                                    <span className={cx('view_count')}>{`${data.comments_count}`}</span>
                                </div>
                            </>
                            <div style={{ display: 'flex', marginLeft: '75px' }}>
                                <div
                                    className={cx('border-icons')}
                                    style={{
                                        backgroundColor: 'rgba(22, 24, 35, 0.7)',
                                        color: 'white',
                                        padding: '0px 1px',
                                    }}
                                >
                                    <FontAwesomeIcon className={cx('icons')} icon={faCode} />
                                </div>
                                <div
                                    className={cx('border-icons')}
                                    style={{
                                        backgroundColor: 'rgb(254, 44, 85)',
                                        color: 'white',
                                        marginLeft: '8px',
                                        padding: '0px 0.1px',
                                    }}
                                >
                                    <FontAwesomeIcon className={cx('icons')} icon={faPaperPlane} />
                                </div>
                                <div
                                    className={cx('border-icons')}
                                    style={{
                                        backgroundColor: 'rgb(0, 117, 250)',
                                        color: 'white',
                                        marginLeft: '8px',
                                        padding: '0px 1.1px',
                                    }}
                                >
                                    <FontAwesomeIcon className={cx('icons')} icon={faFacebook} />
                                </div>
                                <div
                                    className={cx('border-icons')}
                                    style={{
                                        backgroundColor: 'rgb(37, 211, 102)',
                                        color: 'white',
                                        marginLeft: '8px',
                                        padding: '0px 1px',
                                    }}
                                >
                                    <FontAwesomeIcon className={cx('icons')} icon={faPhone} />
                                </div>

                                <div
                                    className={cx('border-icons')}
                                    style={{
                                        backgroundColor: 'rgb(29, 161, 242)',
                                        color: 'white',
                                        marginLeft: '8px',
                                        padding: '0px 1px',
                                    }}
                                >
                                    <FontAwesomeIcon className={cx('icons')} icon={faTwitter} />
                                </div>
                                <div
                                    className={cx('border-icons')}
                                    style={{
                                        backgroundColor: 'white',
                                        color: 'black',
                                        marginLeft: '8px',
                                        padding: '0px 1px',
                                    }}
                                >
                                    <FontAwesomeIcon className={cx('icons')} icon={faShare} />
                                </div>
                            </div>
                        </div>

                        <div className={cx('input-link-user')}>
                            <div className={cx('link-facebook')}>{data.user.facebook_url}</div>
                            <div
                                className={cx('link')}
                                style={{
                                    color: 'black',
                                    fontSize: '16px',
                                    right: '31px',
                                    borderRight: '10px',
                                    position: 'absolute',
                                    borderLeft: '1px solid rgb(204, 204, 204, 0.1)',
                                    padding: ' 9px 10px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                Add Link
                            </div>
                        </div>
                    </div>

                    <div className={cx('coment')}>
                        <CheckComentContext.Provider value={[comment, setComment]}>
                            <handConetxt.Provider value={[userReload, setUserReload]}>
                                <div className={cx('comments-list-in-are')}>
                                    {commentVideo !== '' &&
                                        commentVideo.map((comment, id) => (
                                            <CommentVideo key={id} data={comment} res={focusComment} />
                                        ))}
                                </div>
                            </handConetxt.Provider>
                        </CheckComentContext.Provider>
                    </div>
                </div>
                <div className={cx('listComment')}>
                    <div>
                        <input
                            ref={focusComment}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            className={cx('pust-coment')}
                            title="Add Comment"
                            type="text"
                            placeholder="Thêm bình luận..."
                        />
                    </div>
                    <div>
                        {comment !== '' ? (
                            <>
                                <button className={cx('button-adds')} onClick={handleAddcomment}>
                                    Comment
                                </button>
                            </>
                        ) : (
                            <>
                                <button className={cx('button-add')} onClick={handleAddcomment}>
                                    Comment
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenderComent;
