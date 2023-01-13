import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.modual.scss';

const cx = classNames.bind(styles);
function MenuItem({ to, icon, title, activeIcon }) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('iconv')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('titles')}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
