import * as express from 'express';
import { getOpenid } from '../services/openidService';

export const openidRouter = express.Router();

openidRouter.use('/', async (req, res) => {
    await getOpenid(req, res);
});
