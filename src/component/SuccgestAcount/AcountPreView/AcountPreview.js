import styles from './AcountPreview.module.scss';
import classNames from 'classnames/bind';
import Button from '~/component/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatars')} src={data.avatar} alt={data.nickname} />
                <Button className={cx('btn-follow')} primary>
                    Following
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('names')}>{`${data.first_name} ${data.last_name}`}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{`${data.followings_count}${'M'}`} </strong>
                    <span className={'label'}>followers</span>

                    <strong className={cx('value')}>{`${data.followers_count}${'K'}`} </strong>
                    <span className={'label'}>Like</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
