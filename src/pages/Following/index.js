import Sidebar from '~/layouts/component/Sidebar';
import classNames from 'classnames/bind';
import styles from './following.module.scss';
import { useEffect, useState } from 'react';
import * as followService from '~/Service/followService';
import ProfileUser from '~/component/ListProfileUser';
const cx = classNames.bind(styles);
function Following() {
    const [userVideo, setUserVideo] = useState('');

    useEffect(() => {
        followService
            .getSuggested({ page: 1, perPage: 10 })
            .then((data) => {
                setUserVideo([...data]);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <div>
                <div className={cx('sidebar-follow')}>
                    <Sidebar />
                </div>

                <div className={cx('page-following')}>
                    {userVideo !== '' &&
                        userVideo.map((video, index) => {
                            return <ProfileUser key={index} data={video} />;
                        })}
                </div>
            </div>
        </div>
    );
}

export default Following;
