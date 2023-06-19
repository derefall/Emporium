import { api } from '../../index'

async function getTrailsByTopicId(id?: string) {
    if (id) {
        try {
            const trails = await api.get(`/trail/${id}`);
            return trails.data;
        } catch (error: any) {
            return error
        }
    }
}

export { getTrailsByTopicId };