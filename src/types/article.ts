import { User } from "./user";

export interface Article {
    id: string;
    title: string;
    subtitle?: string;
    material: string;
    user: User;
    updatedAt: string;
}