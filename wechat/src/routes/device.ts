import * as express from 'express';
import * as shortid from 'shortid';
import { createDeviceByApi, createDeviceByDps } from '../services/deviceService';

export const deviceRouter = express.Router();

deviceRouter.use('/:deviceId', async (req, res) => {
    try {
        const deviceId = req.params.deviceId as string || shortid.generate();
        const deviceMode = req.query.mode;
        const device = deviceMode
            ? await createDeviceByDps(deviceId)
            : await createDeviceByApi(deviceId);
        res.status(200).json({ device });
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});
