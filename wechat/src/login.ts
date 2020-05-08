import { fetchResult } from './util';
import { TokenResponse } from './types';

export async function getAccessToken(appId: string, appSecret: string): Promise<TokenResponse> {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    const options = {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET'
    };
    return await fetchResult<TokenResponse>(url, options);
}
