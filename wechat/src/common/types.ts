export interface TokenResponse {
    access_token: string;
    expires_in: number;
}

export interface Users {
    total: number;
    count: number;
    data?: {
        openid: string[];
    };
    next_openid: string;
}

export interface AppIdentity {
    appId: string;
    appSecret: string;
    appCode?: string;
}

export interface Device {
    id: string;
    approved: boolean;
    description?: string;
    displayName?: string;
    instanceOf: string;
    simulated: boolean;
    provisioned?: boolean;
    etag?: string;
}