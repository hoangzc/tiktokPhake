import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Video from '~/layouts/component/Video/ListVideo';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <Video />
        </div>
    );
}

export default Home;
