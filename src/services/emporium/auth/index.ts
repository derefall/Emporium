import { CreateUser, LoginUser, UpdateUser } from '../../../types/user';
import { getTokenCookies } from '../../../utils/tokenCookies';
import { api, apiAuth } from '../../index'

async function createUser(user: CreateUser) {
    try {
        const userCreated = await api.post('/user', user);
        return userCreated.data;
    } catch (error: any) {
        return error
    }
}

async function getUserById(id: any) {

    const token = getTokenCookies()

    try {
        const user = await api.get(`/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return user.data;
    } catch (error: any) {
        return error
    }
}

async function loginUser(user: LoginUser) {
    try {
        const userLogin = await apiAuth.post('/login', user);
        return {
            status: 201,
            records: userLogin.data
        };
    } catch (error: any) {
        return error
    }
}

async function updateUser(user: UpdateUser, token?: string, id?: string) {
    try {
        const userCreated = await api.put(`/user/${id}`, user, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return userCreated.data;
    } catch (error: any) {
        return error
    }
}

export { createUser, loginUser, getUserById, updateUser };