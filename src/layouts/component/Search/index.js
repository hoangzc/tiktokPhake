import HeadlesTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { wrapper as ProperWrapper } from '~/component/proper';
import AccountItem from '~/component/ShearchAcoount';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Shearch.modula.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebount } from '~/hooks';
import * as searchService from '~/Service/searchService';

const cx = classNames.bind(styles);
function Shearch() {
    const [searchvalue, setSearchvalue] = useState('');
    const [shearchvisible, setVisible] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const searchIput = useRef();

    const debount = useDebount(searchvalue, 800);
    useEffect(() => {
        if (!debount.trim()) {
            setVisible([]);
            return;
        }
        setLoading(true);

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debount);
            setVisible(result);

            setLoading(false);
        };
        fetchApi();
    }, [debount]);

    const handalResult = () => {
        setShowResult(false);
    };

    const handSearch = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ') || searchValue.trim()) {
            setSearchvalue(searchValue);
        }
    };

    return (
        <div>
            <HeadlesTippy
                interactive
                visible={showResult && shearchvisible.length > 0}
                render={(attrs) => (
                    <div className={cx('shearch-result')} tabIndex="-1" {...attrs}>
                        <ProperWrapper>
                            <h4 className={cx('shearch-title')}>Tài Khoản</h4>
                            {shearchvisible.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </ProperWrapper>
                    </div>
                )}
                onClickOutside={handalResult}
            >
                <div className={cx('shearch')}>
                    <input
                        ref={searchIput}
                        value={searchvalue}
                        placeholder="shearch account and video"
                        spellCheck={false}
                        onChange={handSearch}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    ></input>
                    {!!searchvalue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setVisible([]);
                                setSearchvalue('');
                                searchIput.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button
                        className={cx('shearch-btn')}
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlesTippy>
        </div>
    );
}

export default Shearch;
