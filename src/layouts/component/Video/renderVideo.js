import VideoProfile from './videoprofile';
import { useEffect, useMemo, useState } from 'react';
import styles from './ListVideo.module.scss';
import classNames from 'classnames/bind';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RenderVideo({ data = [] }) {
    return (
        <div>
            {data !== '' &&
                data.map((data, index) => (
                    <div>
                        <VideoProfile key={index} data={data} />
                    </div>
                ))}
        </div>
    );
}
export const useElementOnScreen = (options, targetRef) => {
    const [isVisibile, setIsVisible] = useState();
    const callbackFunction = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };
    const optionsMemo = useMemo(() => {
        return options;
    });
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [optionsMemo]);
    return isVisibile;
};

export default RenderVideo;
