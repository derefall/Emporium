import { CreateContent } from '../../../types/content';
import { api } from '../../index'

async function getContentByTrailId(id?: string) {
    if (id) {
        try {
            const contents = await api.get(`/content/${id}`);
            return contents.data;
        } catch (error: any) {
            return error
        }
    }
}

async function createContent(content: CreateContent, token?: string) {
    try {
        const contentCreated = await api.post('/content', content, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return contentCreated.data;
    } catch (error: any) {
        return error
    }
}

export { getContentByTrailId, createContent };