import { CreateArticle, UpdateArticle } from '../../../types/article';
import { api, apiBucket } from '../../index'

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

async function getArticlesByContent(id: string) {
    try {
        const articles = await api.get(`/article/content/${id}`);
        return articles.data;
    } catch (error: any) {
        return error
    }
}

async function getArticlesById(id: string) {
    try {
        const article = await api.get(`/article/${id}`);
        return article.data;
    } catch (error: any) {
        return error
    }
}

async function getArticleMaterialByUrl(s3Url: string) {
    try {
        const response = await apiBucket.get(s3Url);
        return response.data;
    } catch (error: any) {
        return error
    }
}

async function createArticle(articleData: any, token?: string) {

    try {
        const articleCreated = await api.post('/article', articleData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return articleCreated.data;
    } catch (error: any) {
        return error
    }
}

async function updateArticle(article: any, token?: string, id?: string) {
    try {
        const articleUpdated = await api.put(`/article/${id}`, article, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('retorno', articleUpdated)
        return articleUpdated.data;
    } catch (error: any) {
        return error
    }
}

async function deleteArticle(id?: string, token?: string) {
    try {
        const articleRemove = await api.delete(`/article/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return articleRemove;
    } catch (error: any) {
        return error
    }
}

export { getArticlesByUser, getArticlesByContent, createArticle, getArticlesById, updateArticle, deleteArticle, getArticleMaterialByUrl };