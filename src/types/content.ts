import { Article } from "./article";
import { Trail } from "./trail";
import { User } from "./user";

export interface Content {
    id: string;
    name: string;
    user: User;
    trail: Trail;
}