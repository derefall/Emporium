import { User } from "./user";

export interface Topic {
    id: string;
    name: string;
    scientific: boolean;
    user: User;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}