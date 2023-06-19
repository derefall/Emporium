import { User } from "./user";

export interface Content {
    id: string;
    name: string;
    user: User;
}