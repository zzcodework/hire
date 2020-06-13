import * as express from 'express';
import { createDevice } from '../services/deviceService';

export const deviceRouter = express.Router();

deviceRouter.use('/', async (req, res) => {
    await createDevice(req, res);
});
