import { fetchResult } from '../common/util';
import { Users, TokenResponse } from '../common/types';
import { renewAccessToken } from './tokenService';
import * as express from 'express';

let accessToken: TokenResponse = {
    access_token: '',
    expires_in: 0
};

export async function listUsers(req: express.Request, res: express.Response) {
    try {
        accessToken = await renewAccessToken(accessToken);
        const users = await listUsersInternal(accessToken.access_token);
        res.status(200).json(users);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
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

export async function upsertUser(req: express.Request, res: express.Response) {
    try {
        res.status(200).json({
            user: 'upsert'
        });
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
}

export async function deleteUser(req: express.Request, res: express.Response) {
    try {
        res.status(200).json({
            user: 'deleted'
        });
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
}
