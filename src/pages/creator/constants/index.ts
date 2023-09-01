import { stringClean } from "../../../utils/utilFunctions"

export const defaultSelect = {
    topic: '',
    trail: '',
    content: '',
}

export const defaulFormItems = {
    content: '',
    trailName: '',
    trailDescription: '',
}

export const defaulFormArticle = {
    title: '',
    subtitle: '',
}

export const mountBodyTrailCreate = (
    name: string,
    description: string,
    topicId: string,
    userId: string
) => {

    return {
        name: name,
        description: description,
        topic: topicId,
        user: userId
    }

}

export const mountBodyContentCreate = (
    name: string,
    trailId: string,
    userId: string
) => {

    return {
        name: name,
        trail: trailId,
        user: userId
    }

}

export const mountBodyArticleCreate = (
    title: string,
    subtitle: string,
    material: string,
    contentId: string,
    userId: string
) => {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', contentId);
    formData.append('user', userId);

    const fileName = stringClean(title)

    const blob = new Blob([material], { type: 'application/json' });
    const file = new File([blob], `${fileName}.json`, { type: 'application/json' });

    formData.append('file', file);

    return formData

}

export const mountBodyArticleUpdate = (
    title: string,
    subtitle: string,
    material: string,
) => {

    return {
        title: title,
        subtitle: subtitle,
        material: material,
    }

}