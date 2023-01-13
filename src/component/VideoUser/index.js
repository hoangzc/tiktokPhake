import styles from './VideoUser.module.scss';
import classNames from 'classnames/bind';
import HoverVideoPlayer from 'react-hover-video-player';
const cx = classNames.bind(styles);

function VideoUserList(data) {
    return (
        <div className={cx('video-me')}>
            <div className={cx('video-dataMe')}>
                <HoverVideoPlayer className={cx('video-succgest-user')} videoSrc={data.data} />
            </div>
        </div>
    );
}

export default VideoUserList;
