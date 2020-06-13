import * as express from 'express';
import { Client } from 'azure-iot-device';
import { Mqtt as IoTHubMqtt } from 'azure-iot-device-mqtt';
import { ProvisioningDeviceClient } from 'azure-iot-provisioning-device';
import { SymmetricKeySecurityClient } from 'azure-iot-security-symmetric-key';
import { Mqtt as DPSMqtt } from 'azure-iot-provisioning-device-mqtt';
import { fetchResult } from '../common/util';
import { Device } from '../common/types';

const host = 'global.azure-devices-provisioning.net';
// const deviceId = 'zz-web';
const scopeId = '0ne00117F1D';
const key = '71Wfq2m3YhXOSm+pWJM57Ud+chaFqP7kz2/8G7y0QHQ=';
const token = 'SharedAccessSignature sr=15bcff61-a3dc-448d-a764-7d7432274fc7&sig=kYilfYeTk5EgOT1DWFbcxQeOOnOlJJDNjbvT7Z1F3Ho%3D&skn=zz&se=1623556621687';

export async function createDevice(req: express.Request, res: express.Response) {
    try {
        const testDevice = await getDevice('phone-sim-1');
        console.log(testDevice);

        const deviceId = req.query.id as string || Date.now().toString();
        const simDeviceId = `${deviceId}_sim`;
        const simDevice: Device = {
            id: simDeviceId,
            displayName: simDeviceId,
            description: `${simDeviceId} simulation`,
            instanceOf: 'urn:wechat:Phone_7c1:1',
            simulated: true,
            approved: true
        };
        const apiSimDevice = await setDevice(simDevice);
        console.log(apiSimDevice);

        const iothubClient = await registerDevice(deviceId);
        iothubClient.emit(deviceId, 'values');

        res.status(200).json({
            deviceId
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
    const body = {
        displayName: device.displayName,
        instanceOf: device.instanceOf,
        simulated: device.simulated,
        approved: device.approved
    };
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
            'content-type': 'application/json',
            authorization: token
        },
        method: 'GET'
    };
    return await fetchResult<Device>(url, options);
}