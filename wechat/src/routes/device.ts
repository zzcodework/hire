import * as express from 'express';
import * as shortid from 'shortid';
import { createDeviceByApi, createDeviceByDps, getDevice } from '../services/deviceService';

export const deviceRouter = express.Router();

deviceRouter.get('/:deviceId', async (req, res) => {
    try {
        const deviceId = req.params.deviceId;
        const device = await getDevice(deviceId);
        res.status(200).json({ device });
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});

deviceRouter.put('/:deviceId', async (req, res) => {
    try {
        const deviceId = req.params.deviceId || shortid.generate();
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
