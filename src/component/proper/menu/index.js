import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.modual.scss';
import { wrapper as PopperWrapper } from '~/component/proper';
import MenuItem from './menuitem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({ children, itemn = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: itemn }]);
    const current = history[history.length - 1];

    const renderItem = () => {
        return current.data.map((item, index) => {
            const isparent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isparent) {
                            setHistory((prev) => {
                                const child = [...prev, item.children];
                                return child;
                            });
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            hideOnClick={false}
            delay={[0, 500]}
            placement="bottom-end"
            offset={[12, 8]}
            render={(attrs) => (
                <div className={cx('menu-List')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-poper')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    setHistory((prev) => {
                                        console.log(prev);
                                        const meo = prev.slice(0, prev.length - 1);
                                        return meo;
                                    });
                                }}
                                items={true}
                            />
                        )}
                        <div className={cx('menu-scroll')}>{renderItem()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
