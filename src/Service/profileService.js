import * as request from '~/until/requeshttp';

export const getSuggested = async ({ token }) => {
    try {
        const res = await request.get(`/auth/me`, {
            headers: {
                Authorization: 'Bearer' + token,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
