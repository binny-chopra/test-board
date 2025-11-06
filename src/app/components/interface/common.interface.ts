export interface IUser {
    id: number;
    username: string;
    email: string;
    company: { name: string };
}

export interface IUserFinal {
    id: number;
    username: string;
    email: string;
    company: string;
    postCount: number;
}

export interface IPost {
    userId: number;
    postCount: number;
}