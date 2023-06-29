export interface CreateUser {
    name: string;
    description: string;
    public_name?: string;
    email: string;
    password: string;
    telegram: string;
    instagram?: string;
    facebook?: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    public_name?: string;
    email: string;
    instagram?: string;
    description?: string;
    facebook?: string;
    telegram: string;
    active: boolean;
    topics: [any];
}

