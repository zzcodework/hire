import * as express from 'express';

export const tokenRouter = express.Router();

tokenRouter.use('/', (req, res) => {
    res.send('token');
});