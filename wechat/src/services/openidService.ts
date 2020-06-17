import { fetchResult } from '../common/util';
import { AppIdentity } from '../common/types';
import { createDecipheriv } from 'crypto';

export async function getOpenid(identity: AppIdentity) {
    const result = await getOpenidInternal(identity);
    return result;
}

async function getOpenidInternal(identity: AppIdentity): Promise<string> {
    if (identity.appCode == null) {
        throw new Error('appCode is null');
    }
    if (identity.appId == null) {
        throw new Error('appId is null');
    }
    if (identity.appSecret == null) {
        throw new Error('appSecret is null');
    }

    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${identity.appId}&secret=${identity.appSecret}&js_code=${identity.appCode}&grant_type=authorization_code`;
    const options = {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET'
    };
    return await fetchResult<string>(url, options);
}

export function decryptData(encryptedData: string, appId: string, sessionKey: string, ivKey: string): string {
    const session = new Buffer(sessionKey, 'base64');
    const data = new Buffer(encryptedData, 'base64');
    const iv = new Buffer(ivKey, 'base64');

    try {
        const decipher = createDecipheriv('aes-128-cbc', session, iv);
        decipher.setAutoPadding(true);
        let decoded = decipher.update(data, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        const decodedData = JSON.parse(decoded);
        if (decodedData.watermark.appid !== appId) {
            throw new Error('Illegal Buffer');
        }
        return decodedData;
    } catch (err) {
        throw new Error('Illegal Buffer');
    }
}