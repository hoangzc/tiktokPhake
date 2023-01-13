import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/acsess/images';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignIn,
    faEllipsisVertical,
    faLanguage,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Buttons from '~/component/Buttons';
import Menu from '~/component/proper/menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/component/icons';

import Image from '~/component/Image';
import Shearch from '../Search';
import Profile from '~/pages/Profile';
import { Link } from 'react-router-dom';
import routers from '~/config/routers';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'English',

        children: {
            title: 'Language',
            data: [
                { code: 'en', title: 'English' },
                { code: 'vn', title: 'Vietnamese' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keybroad setcut',
    },
];

const MenuLoggin = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View Profile',
        to: '/@Profile',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get Coins',
        to: '/coins',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '/setiing',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'log out',
        to: '/logout',
        separete: true,
    },
];
const logger = [
    {
        email: 'hoangzc112@gmail.com',
        password: '123456',
    },
];

function Header({ items }) {
    const errorLoggin = useRef();
    const handleLogginUser = useRef();
    const [emailUser, setEmailUser] = useState('');
    const [passWordUser, setPassWordUser] = useState('');

    const [currenlogger, setCurrenlogger] = useState({ display: 'block' });

    const [hideLoggin, setHideLoggin] = useState(false);
    const [currentUser, setCurrentUser] = useState(items ? items : JSON.parse(localStorage.getItem('message')));
    const handLogginUser = () => {
        setHideLoggin((prev) => !prev);
    };

    useEffect(() => {
        localStorage.setItem('message', currentUser);
    }, [currentUser]);

    const handleEvent = (menuitem) => {};

    const handleSubmit = () => {
        let user = { emailUser, passWordUser };
        logger.map((email) => {
            if (emailUser === email.email && passWordUser === email.password) {
                setCurrentUser(true);

                setEmailUser('');
                setPassWordUser('');
                setCurrenlogger({ display: 'none' });
            } else {
                setCurrentUser(false);
                setEmailUser('');
                setPassWordUser('');
                console.log(123);
            }
        });
    };

    return (
        <div>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <Link to={routers.home} className={cx('logo-link')}>
                            <img src={images.logo} alt="tiktok"></img>
                        </Link>
                    </div>
                    <Shearch />

                    <div className={cx('actions')}>
                        {currentUser ? (
                            <>
                                <Link to={routers.upload}>
                                    <Tippy delay={[0, 200]} content="Upload Video" placement="bottom">
                                        <button className={cx('icon-messenger')}>
                                            <UploadIcon />
                                        </button>
                                    </Tippy>
                                </Link>

                                <Tippy delay={[0, 200]} content="Messenger" placement="bottom">
                                    <button className={cx('icon-messenger')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>

                                <Tippy delay={[0, 200]} content="Hộp Thư" placement="bottom">
                                    <button className={cx('icon-messenger')}>
                                        <InboxIcon />
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Buttons text to={routers.upload}>
                                    Upload
                                </Buttons>

                                <Buttons
                                    primary
                                    rightIcon={<FontAwesomeIcon icon={faSignIn} />}
                                    onClick={handLogginUser}
                                >
                                    {!!hideLoggin ? 'Loggin' : 'Loggin'}
                                </Buttons>
                            </>
                        )}

                        <Menu itemn={MenuLoggin} onChange={handleEvent}>
                            {currentUser ? (
                                <Link to={routers.profile}>
                                    <Image
                                        className={cx('user-avatar')}
                                        src="https://tse4.explicit.bing.net/th?id=OIP.mmIhOpaqJFJNYXruw2Nv4QHaHR&pid=Api&P=0"
                                        // alt={`${loggerData.first_name} ${loggerData.last_name}`}
                                    />
                                </Link>
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    </div>
                </div>
            </header>
            {hideLoggin && (
                <div>
                    <div style={currenlogger} className={cx('loggin-user')}>
                        <div>
                            <div className={cx('email')} ref={handleLogginUser}>
                                <div>
                                    <span className={cx('loogin-use')}>Tài Khoản email</span>
                                    <input
                                        className={cx('email-user')}
                                        onChange={(e) => setEmailUser(e.target.value)}
                                        value={emailUser}
                                        type="email"
                                        placeholder="email"
                                        ref={errorLoggin}
                                    />
                                </div>

                                <div>
                                    <span className={cx('loogin-use')}>Tài Khoản email</span>
                                    <input
                                        className={cx('password-user')}
                                        onChange={(e) => setPassWordUser(e.target.value)}
                                        value={passWordUser}
                                        type="password"
                                        placeholder="password"
                                    />
                                </div>

                                <button className={cx('btn-loggin')} onClick={handleSubmit}>
                                    Loggin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
