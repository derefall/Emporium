import { Topic } from "./topic";
import { User } from "./user";

export interface Trail {
    id: string;
    name: string;
    description: string;
    topic: Topic;
    user: User;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}