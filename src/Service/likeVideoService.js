import * as request from '~/until/requeshttp';

export const getSuggested = async ({ id = id, token }) => {
    try {
        const res = await request.get(`videos/${id}/like`, {
            headers: {
                Authorization: 'Bearer' + token,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
