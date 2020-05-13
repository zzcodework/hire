import { fetchResult } from '../util';
import { AppIdentity } from '../types';
import { appId, appSecret } from '../constant';
import * as express from 'express';

export async function getToken(req: express.Request, res: express.Response) {
    try {
        const identity: AppIdentity = {
            appId: appId,
            appSecret: appSecret,
            appCode: req.query.code as string
        };
        const result = await getAuthorizationCode(identity);
        res.status(200).json(result);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
}

async function getAuthorizationCode(identity: AppIdentity): Promise<string> {
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