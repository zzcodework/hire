import * as express from 'express';
import * as shortid from 'shortid';
import { createDeviceByApi, createDeviceByDps, getDevice, updateDeviceProperties, getDeviceProperties, getDeviceComponentProperties, updateDeviceComponentProperties } from '../services/deviceService';
import { DeviceProperties } from 'common/types';

export const deviceRouter = express.Router();

deviceRouter.get('/:deviceId', async (req, res) => {
    try {
        const deviceId = req.params.deviceId;
        const device = await getDevice(deviceId);
        res.status(200).json(device);
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
        const displayName = req.body.displayName;
        const deviceMode = req.query.mode;
        const device = deviceMode
            ? await createDeviceByDps(deviceId)
            : await createDeviceByApi(deviceId, displayName);
        res.status(200).json(device);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});

deviceRouter.get('/:deviceId/properties', async (req, res) => {
    try {
        const deviceId = req.params.deviceId;
        const result = await getDeviceProperties(deviceId);
        console.log(result);
        res.status(200).json(result);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});

deviceRouter.get('/:deviceId/components/:componentName/properties', async (req, res) => {
    try {
        const deviceId = req.params.deviceId;
        const componentName = req.params.componentName;
        const result = await getDeviceComponentProperties(deviceId, componentName);
        console.log(result);
        res.status(200).json(result);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});

deviceRouter.put('/:deviceId/properties', async (req, res) => {
    try {
        const deviceProperties: DeviceProperties = {
            id: req.params.deviceId,
            name: req.body.nickName,
            image: req.body.avatarUrl,
            manufacturer: req.body.manufacturer
        };
        const result = await updateDeviceProperties(deviceProperties);
        console.log(result);
        res.status(200).json(result);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});

deviceRouter.put('/:deviceId/components/:componentName/properties', async (req, res) => {
    try {
        const properties: DeviceProperties = {
            id: req.params.deviceId,
            componentName: req.params.componentName,
            name: req.body.nickName,
            image: req.body.avatarUrl,
            manufacturer: req.body.manufacturer
        };
        const result = await updateDeviceComponentProperties(properties);
        console.log(result);
        res.status(200).json(result);
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
});
