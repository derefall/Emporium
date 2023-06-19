import { api } from '../../index'

async function getContentByTrailId(id: string) {
    if (id) {
        try {
            const contents = await api.get(`/content/${id}`);
            return contents.data;
        } catch (error: any) {
            return error
        }
    }
}

export { getContentByTrailId };