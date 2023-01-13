import {
    faEllipsisH,
    faHeader,
    faHeadSideCough,
    faHeart,
    faHeartBroken,
    faShieldHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './comment.module.scss';
import { CheckComentContext } from '../RenderComent';
import { useContext, useEffect, useState } from 'react';
import { handConetxt } from '../RenderComent';
import { LikeIcon } from '../icons';
const cx = classNames.bind(styles);
function CommentVideo({ data, res }) {
    const [checkComent, setCheckComent] = useContext(CheckComentContext);
    const [haha, sethaha] = useState(false);
    console.log(res);
    const [listHandComent, setListHandComent] = useState(false);
    const [renderComent, setRenderComent] = useContext(handConetxt);
    const [checkTime, setCheckTime] = useState(false);
    const [checkTimes, setCheckTimes] = useState(false);
    const [checkTimess, setCheckTimess] = useState(false);
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [Time, setTime] = useState('');

    const handleReloadComent = () => {
        res.current.focus();
        setListHandComent(true);
        const renderComment = data.comment;
        setCheckComent(renderComment);
        sethaha(false);
        if (data.user.id !== 4761) {
            sethaha(true);
        }
    };
    const handlTime = () => {};

    const consthandlEvent = () => {
        const birtDay = new Date(data.created_at);
        const d = new Date();
        const secontDay = Math.floor((d - birtDay) / 1000);
        console.log(secontDay / 259200);
        if (secontDay / 31536000 >= 1) {
            const times = Math.floor(secontDay / 31536000);
            return times + ' năm trước ';
        }
        if (secontDay / 259200 >= 1) {
            const times = Math.floor(secontDay / 259200);
            return times + ' tháng trước ';
        }
        if (secontDay / 86400 >= 1) {
            const times = Math.floor(secontDay / 86400);
            return times + ' ngày Trước';
        }
        if (secontDay / 3600 >= 1) {
            const times = Math.floor(secontDay / 3600);
            return times + ' giờ trước';
        }
        if (secontDay / 60 >= 1) {
            const times = Math.floor(secontDay / 60);
            return times + ' phút trước';
        } else {
            return 'vài giây trước';
        }
    };

    const handAleart = () => {
        alert('Định mong chờ gì ở comment của người ta :))');
        sethaha(false);
        setListHandComent(false);
        setCheckComent('');
    };

    const handlePathComent = () => {
        if (data.user.id !== 4761) {
            return;
        } else {
            const idComment = data.id;
            const api = `https://tiktok.fullstack.edu.vn/api/comments/${idComment}`;
            const coment = { comment: checkComent };
            const config = {
                method: 'PATCH',
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
            setCheckComent('');
            setListHandComent(false);
            setRenderComent(true);
            res.current.focus();
        }
        if (renderComent === true) {
            setRenderComent(false);
        } else {
            setRenderComent(true);
        }
    };
    const handleDeleteComent = () => {
        const idComment = data.id;
        const api = `https://tiktok.fullstack.edu.vn/api/comments/${idComment}`;
        const coment = { comment: checkComent };
        const config = {
            method: 'DELETE',
            headers: {
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MzQyNTk0NiwiZXhwIjoxNjc2MDE3OTQ2LCJuYmYiOjE2NzM0MjU5NDYsImp0aSI6IldnY2xIb3Z4djU5MXZvcFQiLCJzdWIiOjQ3NjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.spXauLlvHbmZKRl77yCXBl2s6uFea89OJPzIotPEkf8',
                'Content-Type': 'application/json',
                'Content-Length': '<calculated when request is sent>',
            },
            body: JSON.stringify(coment),
        };

        fetch(api, config)
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
        setCheckComent('');
        res.current.focus();
        if (renderComent === true) {
            setRenderComent(false);
        } else {
            setRenderComent(true);
        }
        setListHandComent(false);
    };

    return (
        <div>
            <div className={cx('comment-user')}>
                <div className={cx('comment-user')}>
                    <img className={cx('img-user')} src={data.user.avatar} alt="" />
                    <div style={{ display: 'block', marginTop: '-1px', marginLeft: '8px' }}>
                        <span style={{ fontWeight: '550', fontSize: '18px' }}>{data.user.nickname}</span>

                        <div className={cx('list-comment')}>{data.comment}</div>

                        {listHandComent === true ? (
                            <>
                                <div>
                                    {haha === true ? (
                                        <button onClick={handAleart} className={cx('icondot')}>
                                            Thêm
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={handlePathComent} className={cx('icondot')}>
                                                Sửa
                                            </button>
                                            <button
                                                style={{ marginLeft: '20px' }}
                                                onClick={handleDeleteComent}
                                                className={cx('icondot')}
                                            >
                                                Xóa
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <button onClick={handleReloadComent} className={cx('icondot')}>
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </button>
                        )}
                    </div>
                </div>{' '}
                <div className={cx('tim')}>
                    <span>{<LikeIcon />}</span>
                    <span style={{ textAlign: 'center', marginTop: '-5px' }}>{data.likes_count}</span>
                </div>
            </div>
            <div className={cx('anserw')}>
                <div className={cx('time_comment')}> {consthandlEvent()}</div>

                <div>Trả Lời</div>
            </div>
        </div>
    );
}

export default CommentVideo;
