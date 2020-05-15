import { fetchResult } from '../common/util';
import { TokenResponse } from '../common/types';
import { appId, appSecret } from '../common/constant';

export async function renewAccessToken(token: TokenResponse): Promise<TokenResponse> {
    const now = new Date().getTime();
    const delta = 60 * 1000;
    if (token == null
        || token.access_token === ''
        || token.expires_in - now < delta) {
        token = await getAccessToken();
    }
    return token;
}

async function getAccessToken(): Promise<TokenResponse> {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    const options = {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET'
    };
    return await fetchResult<TokenResponse>(url, options);
}
