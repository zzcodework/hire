import * as express from 'express';
import { getOpenid, decryptData } from '../services/openidService';
import { AppIdentity } from '../common/types';
import { appId, appSecret } from '../common/constant';

export const openidRouter = express.Router();

openidRouter.get('/', async (req, res) => {
    try {
        const identity: AppIdentity = {
            appId,
            appSecret: appSecret,
            appCode: req.query.code as string
        };
        const result = await getOpenid(identity);
        res.status(200).json(result);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});

openidRouter.post('/decrypt', async (req, res) => {
    try {
        const encryptedData = req.body.encryptedData;
        const sessionKey = req.body.sessionKey;
        const ivKey = req.body.ivKey;
        const result = decryptData(encryptedData, appId, sessionKey, ivKey);
        console.log(result);
        res.status(200).json(result);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});