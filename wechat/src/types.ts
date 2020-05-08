export interface TokenResponse {
    access_token: string;
    expires_in: number;
}

export interface Users {
    total: number;
    count: number;
    next_openid: string;
}