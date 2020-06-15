import * as express from 'express';
import { deviceRouter } from '../routes/device';

export const device = express();

device.use('/', deviceRouter);
