import * as express from 'express';
import { listUsers } from '../services/userService';

export const userRouter = express.Router();

userRouter.use('/', async (req, res) => {
    await listUsers(req, res);
});
