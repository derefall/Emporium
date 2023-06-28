import { CreateTrail } from '../../../types/trail';
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

async function createTrail(trail: CreateTrail, token?: string) {
    try {
        const trailCreated = await api.post('/trail', trail, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return trailCreated.data;
    } catch (error: any) {
        return error
    }
}

export { getTrailsByTopicId, createTrail };