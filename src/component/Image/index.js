import { forwardRef } from 'react';

const Image = forwardRef(({ ...props }, ref) => {
    return <img ref={ref} {...props} />;
});

export default Image;

// import { forwardRef, useState } from 'react';
// import images from '~/acsess/images';

// const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
//     const [fallback, setFallback] = useState('');

//     const handleEror = () => {
//         setFallback(customFallback);
//     };
//     return <img ref={ref} src={fallback || src} alt={alt} {...props} onError={handleEror} />;
// });

// export default Image;
