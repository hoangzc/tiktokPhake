import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    FollowingActiveIcon,
    FollowingIcon,
    LiveActiveIcon,
    LiveIcon,
} from '~/component/icons';
import SuccgestAcount from '~/component/SuccgestAcount';
import * as followService from '~/Service/followService';
import { useState, useEffect } from 'react';
import Button from '~/component/Buttons';
const cx = classNames.bind(styles);
const INIT_PAGE = 2;
const INIT_FOLLOW = 4;
const PER_PAGE = 5;

function Sidebar({ iten }) {
    const [page, setPage] = useState(INIT_PAGE);
    const [pageFollow, setPageFollow] = useState(INIT_FOLLOW);
    const [seeLest, setSeeLest] = useState(false);
    const [seeFollow, setSeeFollow] = useState(false);
    const [suggesUser, setSuggesUser] = useState('');
    const [suggesMe, setSuggesMe] = useState('');
    const [handleLogger, setHandleLogger] = useState(iten);
    const [loggin, setLoggin] = useState(false);

    useEffect(() => {
        followService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                if (handleLogger === false) {
                    setSuggesUser('');
                } else if (seeLest === false) {
                    setSuggesUser(() => [...data]);
                } else {
                    setSuggesUser((prevUser) => [...prevUser, ...data]);
                }
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        setLoggin(JSON.parse(localStorage.getItem('message')));
    }, []);

    useEffect(() => {
        followService
            .getSuggested({ page: pageFollow, perPage: PER_PAGE })
            .then((data) => {
                if (seeFollow === true) {
                    setSuggesMe((prevUser) => [...prevUser, ...data]);
                } else {
                    setSuggesMe(() => [...data]);
                }
            })
            .catch((error) => console.log(error));
    }, [pageFollow]);

    const handleSeeAll = () => {
        setSeeLest(false);
        if (seeLest) {
            setPage(page - 1);
        } else {
            setPage(page + 1);

            setSeeLest(true);
        }
    };

    const handleFllow = () => {
        setSeeFollow(false);
        if (seeFollow) {
            setPageFollow(pageFollow - 1);
        } else {
            setPageFollow(pageFollow + 1);
            setSeeFollow(true);
        }
    };

    return (
        <aside className={cx('wrappers')}>
            <Menu>
                <MenuItem
                    title="For You"
                    to={config.routers.home}
                    icon={<HomeActiveIcon />}
                    activeIcon={<HomeIcon />}
                />
                <MenuItem
                    title="Following"
                    to={config.routers.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingActiveIcon />}
                />
                <MenuItem title="Lives" to={config.routers.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            {loggin ? (
                <SuccgestAcount
                    label="Sucgest account"
                    data={suggesUser}
                    SeeLest={seeLest}
                    onSeeAll={handleSeeAll}
                    checkSeeMore={true}
                />
            ) : (
                <div className={cx('border-loggin')}>
                    <span className={cx('sign-loggin')}>
                        Sign in to follow authors, like videos, and view comments.
                    </span>
                    <Button ouline className={cx('button-login')}>
                        Loggin
                    </Button>
                </div>
            )}

            <SuccgestAcount
                label="Following account"
                data={suggesMe}
                SeeMore={seeFollow}
                onseeMore={handleFllow}
                checkSeeMore={false}
            />
        </aside>
    );
}

export default Sidebar;
