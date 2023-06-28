import { User } from "./user";

export interface Article {
    id: string;
    title: string;
    subtitle?: string;
    material: string;
    user: User;
    updatedAt: string;
}

export interface ArticleContent {
    id: string;
    title: string;
    articles: Article[];
}

export interface CreateArticle {
    title: string;
    subtitle: string;
    material: string;
    content: string;
    user: string;
}