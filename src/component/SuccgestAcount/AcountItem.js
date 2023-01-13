import styles from './SuccgestAcount.module.scss';
import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { wrapper as PopperWrapper } from '~/component/proper';
import Tippy from '@tippyjs/react/headless';
import AccountPreview from './AcountPreView/AcountPreview';

const cx = classNames.bind(styles);

function AcountItem({ data }) {
    const RenderPriview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy interactive delay={[300, 200]} placement="bottom" offset={[-30, 0]} render={RenderPriview}>
                <div className={cx('account-item')}>
                    {data.avatar != '' && <img className={cx('avatars')} src={data.avatar} alt={data.nickname}></img>}

                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{`${data.first_name} ${data.last_name}`}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('names')}>{data.nickname}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default AcountItem;
