import styles from './AcountUser.module.scss';
import classNames from 'classnames/bind';
import Button from '~/component/Buttons';
const cx = classNames.bind(styles);
function AcountUsers(data) {
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <img className={cx('avatars')} src={data.data.user.avatar} />
                    <Button className={cx('btn-follow')} ouline>
                        Following
                    </Button>
                </div>
                <div className={cx('body')}>
                    <p className={cx('nickname')}>
                        <strong>{data.data.user.first_name}</strong>
                    </p>
                    <p className={cx('names')}>{`${data.data.user.first_name}  ${data.data.user.last_name}`}</p>
                    <p className={cx('analytics')}>
                        <strong className={cx('value')}>{`${data.data.user.followings_count}M`}</strong>
                        <span className={'label'}> followers</span>

                        <strong className={cx('value')}>{`${data.data.user.followers_count}K`}</strong>
                        <span className={'label'}> Like</span>
                    </p>
                </div>

                <div className={cx('introduce')}>
                    <p>
                        Gmail 📩 : {`${data.data.user.bio}@gmail.com`} :{' '}
                        {`${data.data.user.first_name}  ${data.data.user.last_name}`} :{' '}
                        {`${data.data.user.first_name} ${data.data.user.last_name}`} Thánh PR
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AcountUsers;
