import { ReturnApi } from '../../../types/return';
import { CreateUser } from '../../../types/user';
import api from '../../index'

async function createUser(user: CreateUser) {
    try {
        const userCreated = await api.post('/user', user);
        console.log('usuario criado', userCreated)
        return userCreated.data;
    } catch (error: any) {
        console.log('error', error.response.data)
        return error
    }
}

export default createUser;