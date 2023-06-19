import { api } from '../../index'

async function getTopics() {

    try {
        const topics = await api.get(`/topic`,);
        return topics.data;
    } catch (error: any) {
        return error
    }
}

export { getTopics };