import { useEffect, useState } from 'react';

function UseDebount(value, delay) {
    const [usedebountValue, setUsedebount] = useState(value);

    useEffect(() => {
        const usedelay = setTimeout(() => {
            setUsedebount(value);
        }, delay);

        return () => {
            clearInterval(usedelay);
        };
    }, [value]);

    return usedebountValue;
}

export default UseDebount;
