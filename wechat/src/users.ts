import { fetchResult } from './util';
import { Users } from './types';

export async function listUsers(accessToken: string): Promise<Users> {
    const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${accessToken}`;
    const options = {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET'
    };
    return await fetchResult<Users>(url, options);
}


