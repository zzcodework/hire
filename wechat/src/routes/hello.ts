import * as express from 'express';

export const helloRouter = express.Router();

helloRouter.use('/', (req, res) => {
    res.send('hello');
});