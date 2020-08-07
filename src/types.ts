export interface User {
    id: string,
    avatar: string,
    discriminator: string,
    public_flags: number,
    username: string
}

export interface APIKey {
    creator: string,
    is_admin: boolean,
    key: string
}