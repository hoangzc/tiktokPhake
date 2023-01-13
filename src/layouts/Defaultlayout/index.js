import Header from '~/layouts/component/Header';
import Sidebar from '~/layouts/component/Sidebar/Sidebar';
import styles from './Defaultlayout.modual.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <div className={cx('wrapperr')}>
                <Header />
                <div className={cx('container')}>
                    <Sidebar />

                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
