import * as express from 'express';
import { userRouter } from '../routes/user';

export const user = express();

user.use('/', userRouter);
