import * as express from 'express';
import * as shortid from 'shortid';
import { Client } from 'azure-iot-device';
import { Mqtt as IoTHubMqtt } from 'azure-iot-device-mqtt';
import { ProvisioningDeviceClient } from 'azure-iot-provisioning-device';
import { SymmetricKeySecurityClient } from 'azure-iot-security-symmetric-key';
import { Mqtt as DPSMqtt } from 'azure-iot-provisioning-device-mqtt';
import { fetchResult } from '../common/util';
import { Device } from '../common/types';
import { key, host, scopeId, token } from '../common/constant';

export async function createDevice(req: express.Request, res: express.Response) {
    try {
        const deviceId = req.query.id as string || shortid.generate();
        const simDevice: Device = {
            id: deviceId,
            displayName: `${deviceId}-sim`,
            description: `${deviceId}-desc`,
            instanceOf: 'urn:f9va_utuf:modelDefinition:_xpulqjczp',
            simulated: true,
            approved: true
        };
        const apiSimDevice = await setDevice(simDevice);
        console.log(apiSimDevice);

        // const iothubClient = await registerDevice(deviceId);
        // iothubClient.emit(deviceId, 'values');

        res.status(200).json({
            apiSimDevice
        });
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
}

async function registerDevice(deviceId: string): Promise<Client> {
    // Only works for Cloud First
    // const deviceId = 'zz-web';

    const dpsTransport = new DPSMqtt();
    const securityClient = new SymmetricKeySecurityClient(deviceId, key);
    const dpsClient = ProvisioningDeviceClient.create(host, scopeId, dpsTransport, securityClient);

    return new Promise((resolve, reject) => {
        dpsClient.register((err, result) => {
            if (err) {
                console.log('Register DPS client failed.');
                reject(err);
            } else {
                const connectionString = `HostName=${result.assignedHub};DeviceId=${result.deviceId};SharedAccessKey=${key}`;
                const iothubClient = Client.fromConnectionString(connectionString, IoTHubMqtt);

                iothubClient.open(err => {
                    if (err) {
                        console.log('Open IoTHub client failed.');
                        reject(err);
                    } else {
                        resolve(iothubClient);
                    }
                });
            }
        });
    });
}

async function setDevice(device: Device): Promise<Device> {
    const url = `https://wechat.azureiotcentral.com/api/preview/devices/${device.id}`;
    const body = JSON.stringify({
        displayName: device.displayName,
        // description: device.description,
        instanceOf: device.instanceOf,
        simulated: device.simulated,
        approved: device.approved
    });
    const options = {
        headers: {
            'content-type': 'application/json',
            authorization: token
        },
        method: 'PUT',
        body
    };
    return await fetchResult<Device>(url, options);
}

async function getDevice(deviceId: string): Promise<Device> {
    const url = `https://wechat.azureiotcentral.com/api/preview/devices/${deviceId}`;
    const options = {
        headers: {
            authorization: token
        },
        method: 'GET'
    };
    return await fetchResult<Device>(url, options);
}