import classNames from 'classnames/bind';
import { BrowserRouter, Link, Route, Router, Routes, useNavigate, useParams } from 'react-router-dom';
import routers from '~/config/routers';
import Button from '../Buttons';
import styles from './listProfile.module.scss';

const cx = classNames.bind(styles);

function ProfileUser({ data = [] }) {
    return (
        <>
            <div className={cx('video-usser-list')}>
                <div className={cx('video-zc')}>
                    <Link to={'/@' + data.nickname} target="_blank">
                        <video className={cx('video')} src={data.popular_video.file_url} />
                    </Link>

                    <div className={cx('child-video')}>
                        <img className={cx('img-cl')} src={data.avatar} alt="" />
                        <h1 className={cx('name-user')}>{data.nickname}</h1>
                        <Button primary>Follow</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileUser;
