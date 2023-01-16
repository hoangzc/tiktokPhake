import styles from './ListVideo.module.scss';
import classNames from 'classnames/bind';
import RenderVideo from './renderVideo';
import * as videoService from '~/Service/videoService';
import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const initialState = false;
const NIT_FOLLOW =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MzQyNTk0NiwiZXhwIjoxNjc2MDE3OTQ2LCJuYmYiOjE2NzM0MjU5NDYsImp0aSI6IldnY2xIb3Z4djU5MXZvcFQiLCJzdWIiOjQ3NjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.spXauLlvHbmZKRl77yCXBl2s6uFea89OJPzIotPEkf8';

export const themeContext = createContext();
export const creatLikeContext = createContext();
function Video() {
    const list = Math.floor(Math.random() * 20);
    const [videos, setVideos] = useState(0);
    const [videoList, setVideoList] = useState('');
    const [conInviewLast, setConInviewLast] = useState(false);
    const [theme, setTheme] = useState(initialState);
    const { ref, inView, entry } = useInView({ threshold: 0 });
    const [likevideo, setLikevideo] = useState(false);
    console.log(conInviewLast);

    useEffect(() => {
        console.log('11111');
        videoService
            .getSuggested('for-you', videos, NIT_FOLLOW)

            .then((data) => {
                if (conInviewLast === true) {
                    setVideoList((prev) => [...prev, ...data]);
                } else if (conInviewLast === false) {
                    setVideoList((prev) => [...prev]);
                }
            })
            .catch((error) => console.log(error));
    }, [videos]);

    useEffect(() => {
        videoService
            .getSuggested('for-you', videos, NIT_FOLLOW)

            .then((data) => {
                if (conInviewLast === true) {
                    setVideoList((prev) => [...prev, ...data]);
                } else if (conInviewLast === false) {
                    setVideoList((prev) => [...data]);
                }
            })
            .catch((error) => console.log(error));
    }, [likevideo]);

    useEffect(() => {
        if (inView === true) {
            setConInviewLast(true);
            setVideos(videos + 1);
            setInterval(() => {
                setConInviewLast(false);
            }, 2000);
        } else {
            setConInviewLast(false);
        }
    }, [inView]);
    return (
        <>
            <div>
                <div className={cx('body')}>
                    {theme == true ? (
                        <div className={cx('wrapperrs')}>
                            <>{(document.body.style.overflow = 'hidden')}</>
                            <themeContext.Provider value={[theme, setTheme]}>
                                <creatLikeContext.Provider value={[likevideo, setLikevideo]}>
                                    <RenderVideo view={inView} data={videoList} />
                                </creatLikeContext.Provider>
                            </themeContext.Provider>
                        </div>
                    ) : (
                        <div className={cx('wrapperr')}>
                            <>{(document.body.style.overflow = 'overlay')}</>
                            <themeContext.Provider value={[theme, setTheme]}>
                                <creatLikeContext.Provider value={[likevideo, setLikevideo]}>
                                    <RenderVideo view={inView} data={videoList} />
                                </creatLikeContext.Provider>
                            </themeContext.Provider>
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('the-last-video')}>
                <div ref={ref}>
                    <h1 className={cx('last-body')}>{inView}</h1> {console.log(inView)}
                    <div>
                        <h2 className={cx('load-body')}>
                            {conInviewLast === true && <FontAwesomeIcon icon={faSpinner} />}
                        </h2>
                    </div>
                </div>
                <div></div>
            </div>
        </>
    );
}

export default Video;
