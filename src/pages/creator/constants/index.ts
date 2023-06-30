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

    return {
        title: title,
        subtitle: subtitle,
        material: material,
        content: contentId,
        user: userId
    }

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