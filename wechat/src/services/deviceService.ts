import * as express from 'express';
import { Client } from 'azure-iot-device';
import { Mqtt as IoTHubMqtt } from 'azure-iot-device-mqtt';
import { ProvisioningDeviceClient } from 'azure-iot-provisioning-device';
import { SymmetricKeySecurityClient } from 'azure-iot-security-symmetric-key';
import { Mqtt as DPSMqtt } from 'azure-iot-provisioning-device-mqtt';
import { RegistrationClient } from 'azure-iot-provisioning-device/lib/interfaces';

const host = 'global.azure-devices-provisioning.net';
const deviceId = 'rqusekqzej17q44qfk9a4y';
const scopeId = '0ne00117F1D';
const key = 'nh0KrCGJm36MrhALpVF+ZwC20d9vppWWJ2NhPb2QSlU=';

export async function createDevice(req: express.Request, res: express.Response) {
    try {
        // const deviceId = req.query.id as string || Date.now().toString();
        const dpsTransport = new DPSMqtt();
        const securityClient = new SymmetricKeySecurityClient(deviceId, key);
        const dpsClient = ProvisioningDeviceClient.create(host, scopeId, dpsTransport, securityClient);

        const iothubClient = await registerDevice(dpsClient);
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

async function registerDevice(dpsClient: RegistrationClient): Promise<Client> {
    return new Promise((resolve, reject) => {
        dpsClient.register((err, result) => {
            if (err) {
                console.log('11111111');
                reject(err);
            } else {
                const connectionString = `HostName=${result.assignedHub};DeviceId=${result.deviceId};SharedAccessKey=${key}`;
                console.log(connectionString);
                const iothubClient = Client.fromConnectionString(connectionString, IoTHubMqtt);
                console.log(iothubClient);

                iothubClient.open(err => {
                    if (err) {
                        console.log('2222222');
                        reject(err);
                    } else {
                        resolve(iothubClient);
                    }
                });
            }
        });
    });
}