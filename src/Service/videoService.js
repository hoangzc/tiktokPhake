import * as request from '~/until/requeshttp';

export const getSuggested = async (type, page, token) => {
    try {
        const res = await request.get(`videos`, {
            params: {
                type,
                page,
            },
            headers: {
                Authorization: 'Bearer' + token,
            },
        });
        return res.data;
    } catch (error) {}
};
