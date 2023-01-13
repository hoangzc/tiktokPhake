import Button from '~/component/Buttons';
import classNames from 'classnames/bind';
import styles from './Menu.modual.scss';

const cx = classNames.bind(styles);
function MenuItem({ data, onClick }) {
    return (
        <Button
            className={cx('menu-item', {
                separete: data.separete,
            })}
            leftIcon={data.icon}
            to={data.to}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;
