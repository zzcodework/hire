import { fetchResult } from '../common/util';
import { Users, TokenResponse, User } from '../common/types';
import { renewAccessToken } from './tokenService';
import { upsertEntity, deleteEntity } from './tableService';

let accessToken: TokenResponse = {
    access_token: '',
    expires_in: 0
};

export async function listUsers(): Promise<Users> {
    accessToken = await renewAccessToken(accessToken);
    return await listUsersInternal(accessToken.access_token);
}

async function listUsersInternal(accessToken: string): Promise<Users> {
    const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${accessToken}`;
    const options = {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET'
    };
    return await fetchResult<Users>(url, options);
}

export async function upsertUser(user: User): Promise<any> {
    const entity = await upsertEntity(user);
    return entity;
}

export async function deleteUser(userId: string): Promise<string> {
    return await deleteEntity(userId);
}
