import * as express from 'express';

export const defaultRouter = express.Router();

defaultRouter.use('/', (req, res) => {
    res.send('default');
});