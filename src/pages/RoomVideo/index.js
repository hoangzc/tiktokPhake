import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './roomvideo.module.scss';
const cx = classNames.bind(styles);
function RoomVideo() {
    const { nickname } = useParams();
    console.log(nickname);
    return (
        <>
            <div className={cx('video')}>
                <h1>hshhdusisdiud</h1>
            </div>

            <div className={cx('user')}>{/* <CommentVideo /> */}</div>
        </>
    );
}

export default RoomVideo;
