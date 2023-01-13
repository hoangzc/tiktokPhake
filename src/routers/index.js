import HeaderOnly from '~/layouts/HeaderOnly';
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Shearch from '~/pages/Shearch';
import Live from '~/pages/Live';
import config from '~/config';
import RoomVideo from '~/pages/RoomVideo';

const publicRouters = [
    { path: config.routers.home, Component: Home },

    { path: config.routers.following, Component: Following, layout: HeaderOnly },
    { path: config.routers.profile, Component: Profile, layout: HeaderOnly },
    { path: config.routers.upload, Component: Upload, layout: HeaderOnly },
    { path: config.routers.shearch, Component: Shearch, layout: null },
    { path: config.routers.live, Component: Live },
    { path: config.routers.roomvideo, Component: RoomVideo, layout: null },
];
const priverRouter = [];

export { publicRouters, priverRouter };
