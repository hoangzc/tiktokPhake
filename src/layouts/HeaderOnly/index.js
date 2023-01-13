import Header from '~/layouts/component/Header';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const ust = JSON.parse(localStorage.getItem('message'));

    return (
        <div>
            <div>
                <Header items={ust} />

                <div className="container">
                    <div className="content">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderOnly;
