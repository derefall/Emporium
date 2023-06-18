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
