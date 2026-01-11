export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    url?: string;
    github?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};