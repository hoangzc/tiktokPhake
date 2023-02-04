import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './UploadVideo.module.scss';

const cx = classNames.bind(styles);

function Upload() {
    const namevideo = useRef();
    const [file, setFile] = useState('');
    const [names, setName] = useState('');
    const [pathValue, setPathValue] = useState('');
    const [files, setfiles] = useState('');
    const [checkfile, setCheckfile] = useState(false);
    const handUploadVideo = (e) => {
        const filel = e.target.files[0];
        const values = e.target.value;

        setName(filel.name);
        const handfile = URL.createObjectURL(filel);
        if (checkfile === false) {
            setFile(filel);
            setCheckfile(true);
            setfiles(handfile);
            setPathValue(values);
        } else {
            setCheckfile(false);
        }
    };
    const handRemoveVideo = () => {
        setFile('');
        setfiles('');
        setCheckfile(false);
    };

    const handleVideoName = (e) => {
        e.current.focus();
    };

    const handUploadVideoPost = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', names);
        formData.append('upload_file', file);
        formData.append('thumbnail_time', '10');
        formData.append('music', 'Hi');
        formData.append('viewable', 'public');
        formData.append('allows[]', 'comment');
        const api = `https://tiktok.fullstack.edu.vn/api/videos`;

        fetch(api, {
            method: 'POST',
            headers: {
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MzQyNTk0NiwiZXhwIjoxNjc2MDE3OTQ2LCJuYmYiOjE2NzM0MjU5NDYsImp0aSI6IldnY2xIb3Z4djU5MXZvcFQiLCJzdWIiOjQ3NjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.spXauLlvHbmZKRl77yCXBl2s6uFea89OJPzIotPEkf8',
                Accept: 'application/json',
            },

            body: formData,
        })
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    return (
        <div className={cx('body')}>
            <div className={cx('body-upload')}>Tải Video Lên</div>
            <div className={cx('title-upload')}>Đăng video vào tài khoản của bạn</div>

            <div className={cx('title')}>
                {checkfile === true ? (
                    <div style={{ display: 'block' }}>
                        <div className={cx('background')}>
                            <video src={files} controls className={cx('handVideo')}></video>
                        </div>
                        <div className={cx('button-postvideo')}>
                            <div style={{ display: 'flex' }}>
                                <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px', marginTop: '1px' }} />
                                <div>{file.name}</div>
                            </div>

                            <div
                                onClick={handRemoveVideo}
                                style={{ fontWeight: '500', fontSize: '12px', marginTop: '-2px', cursor: 'pointer' }}
                            >
                                Thay đổi video
                            </div>
                        </div>
                    </div>
                ) : (
                    // </div>
                    <div className={cx('border-upload')}>
                        <div className={cx('this-upload')}>
                            <img
                                src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                                class="jsx-2404389384 cloud-icon"
                            ></img>
                            <div style={{ fontSize: '30px', marginBottom: '18px' }}></div>
                            <h5 style={{ marginBottom: '12px', lineHeight: '1.5', fontSize: '18px' }}>
                                Chọn để tải video lên
                            </h5>
                            <div
                                style={{
                                    marginBottom: '15px',
                                    color: 'rgba(22,24,35,0.75)',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                }}
                            >
                                {' '}
                                Hoặc kéo thả vào tập tin
                            </div>
                            <div className={cx('list-pram')}>
                                <span style={{ marginTop: '6px' }}>MP4 hoặc WEbM</span>
                                <span style={{ marginTop: '6px' }}> Độ phân giải 720x1280 trở lên</span>
                                <span style={{ marginTop: '6px' }}> Tối đa 30 phút</span>
                                <span style={{ marginTop: '6px' }}> Nhỏ hơn 2 GB</span>

                                <button className={cx('button-add')} onClick={handUploadVideo}>
                                    <label for="myfile">Chọn tệp tin</label>
                                    <input type="file" hidden onChange={handUploadVideo} id="myfile" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className={cx('container')}>
                    <div className={cx('titile-video')}>
                        <div className={cx('fix-video')}>
                            <div className={cx('child-fixVideo')} style={{ display: 'flex' }}>
                                <img
                                    src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/divide_black.e1e40d5b.svg"
                                    className={cx('jsx-13916759')}
                                ></img>

                                <div style={{ display: 'flex', marginTop: '15px', marginLeft: '10px' }}>
                                    <div>
                                        <div>Chia video và chỉnh sửa</div>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                color: 'rgba(22,24,35,0.75)',
                                                fontWeight: '400',
                                                opacity: '0.75',
                                                marginTop: '7px',
                                            }}
                                        >
                                            Bạn có thể nhanh chóng phân chia video thành nhiều phần, loại bỏ các phần
                                            thừa và chuyển video ngang thành video dọc
                                        </div>
                                    </div>
                                    <button className={cx('button-fix')}>Chỉnh sửa</button>
                                </div>
                            </div>
                        </div>

                        <div className={cx('fix-videos')}>
                            <div style={{ fontWeight: '500', marginLeft: '2px' }}>Chú thích</div>
                            <input
                                value={names}
                                className={cx('input-data')}
                                ref={namevideo}
                                onChange={(e) => setName(e.target.value)}
                                style={{ fontSize: '16px', padding: '0 10px' }}
                            ></input>
                            <FontAwesomeIcon />
                        </div>

                        <div className={cx('fix-videoss')}>
                            <div>Ảnh bìa</div>
                            <div className={cx('imgs')}>
                                <div className={cx('child-img')}></div>
                            </div>
                        </div>
                        <div className={cx('hide-user')}>
                            <div>Ai có thể xem video này</div>
                            <div className={cx('hidderUser')}>
                                <div style={{ color: '#ccc', padding: '7px 20px' }}>Công khai</div>
                                <FontAwesomeIcon className={cx('icon-down')} icon={faAngleDown} />
                            </div>
                        </div>
                        <div className={cx('allowUser')}>
                            <div> Cho phép người dùng</div>
                            <div style={{ display: 'flex', marginTop: '8px' }}>
                                <div className={cx('inputcheck')}>
                                    <input
                                        type="checkbox"
                                        checked="true"
                                        style={{ width: '20px', height: '15px', marginRight: '6px' }}
                                    />
                                    <span style={{ fontSize: '16px', padding: '1px' }}>Bình luận</span>
                                </div>
                                <div className={cx('cehckbox')}>
                                    <input
                                        type="checkbox"
                                        checked="true"
                                        style={{ width: '20px', height: '15px', marginRight: '6px' }}
                                    />
                                    <span style={{ fontSize: '16px', padding: '1px' }}>Duet</span>
                                </div>
                                <div className={cx('cehckbox')}>
                                    <input
                                        type="checkbox"
                                        checked="true"
                                        style={{ width: '20px', height: '15px', marginRight: '6px', color: 'red' }}
                                    />
                                    <span style={{ fontSize: '16px', padding: '1px' }}>Stitch</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginLeft: '-70px', marginTop: '-20px' }}>
                            <button className={cx('button-up')} style={{ backgroundColor: '#fafafa' }}>
                                Hủy Bỏ
                            </button>
                            <button className={cx('button-up')} onClick={handUploadVideoPost}>
                                Đăng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
