import * as request from '~/until/requeshttp';

export const search = async (q, type = 'less') => {
    try {
        const res = await request.get(`users/search`, {
            params: {
                q,
                type,
            },
        });
        return res.data;
        // setVisible(res.data);
        // setLoading(false);
    } catch (error) {
        // setLoading(false);
    }
};
