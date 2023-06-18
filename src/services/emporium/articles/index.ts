import { api } from '../../index'

async function getArticlesByUser(token?: string, userId?: string) {

    try {
        const userCreated = await api.get(`/article/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return userCreated.data;
    } catch (error: any) {
        return error
    }
}

export { getArticlesByUser };