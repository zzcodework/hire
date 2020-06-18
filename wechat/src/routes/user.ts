import * as express from 'express';
import { listUsers, upsertUser, deleteUser, getUser } from '../services/userService';
import { User } from '../common/types';

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await listUsers();
        res.status(200).json(users);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});

userRouter.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await getUser(userId);
        res.status(200).json(user);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});

userRouter.put('/:userId', async (req, res) => {
    try {
        const user: User = {
            id: req.params.userId,
            name: req.body.name,
            openid: req.body.openid,
            avatarUrl: req.body.avatarUrl,
            city: req.body.city,
            country: req.body.country,
            gender: req.body.gender,
            language: req.body.language,
            nickName: req.body.nickName,
            province: req.body.province
        };
        const result = await upsertUser(user);
        res.status(200).json(result);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});

userRouter.delete('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await deleteUser(userId);
        res.status(200).json(user);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});
