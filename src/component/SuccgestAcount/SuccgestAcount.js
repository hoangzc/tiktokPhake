import styles from './SuccgestAcount.module.scss';
import classNames from 'classnames/bind';
import AccountItem from './AcountItem';

const cx = classNames.bind(styles);

function SuccgestAcount({ label, data = [], onSeeAll, SeeMore = false, onseeMore, SeeLest = false, checkSeeMore }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data !== '' && data.map((user) => <AccountItem key={user.id} data={user} />)}
            {checkSeeMore && (
                <p className={cx('see-all')} onClick={() => onSeeAll(SeeLest)}>
                    {SeeLest ? 'see less' : 'see all'}
                </p>
            )}

            {!checkSeeMore && (
                <p className={cx('see-all')} onClick={() => onseeMore(SeeMore)}>
                    {SeeMore ? 'see more' : 'see all'}
                </p>
            )}
        </div>
    );
}

export default SuccgestAcount;
