export interface User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

export interface UserResponse {
    user: User;
}