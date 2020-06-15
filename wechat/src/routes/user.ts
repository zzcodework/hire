import * as express from 'express';
import { listUsers, upsertUser, deleteUser } from '../services/userService';

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    await listUsers(req, res);
});

userRouter.put('/:userId', async (req, res) => {
    await upsertUser(req, res);
});

userRouter.delete('/:userId', async (req, res) => {
    await deleteUser(req, res);
});
