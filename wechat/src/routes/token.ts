import * as express from 'express';
import { getToken } from '../services/tokenService';

export const tokenRouter = express.Router();

tokenRouter.use('/', (req, res) => {
    getToken(req, res);
});
