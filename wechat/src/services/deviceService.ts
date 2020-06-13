import * as express from 'express';
import { Client } from 'azure-iot-device';
import { Mqtt as IoTHubMqtt } from 'azure-iot-device-mqtt';
import { ProvisioningDeviceClient } from 'azure-iot-provisioning-device';
import { SymmetricKeySecurityClient } from 'azure-iot-security-symmetric-key';
import { Mqtt as DPSMqtt } from 'azure-iot-provisioning-device-mqtt';

const host = 'global.azure-devices-provisioning.net';
const scopeId = '0ne00117F1D';
const key = 'KA4Vfez1m+P1nnfaZWck53JDLHj14tBT/ibsmh9kySfNCSXLttp2hRMmP6Y4WFSilBT1WFEDsnB/83tK0wl8oA==';

export async function createDevice(req: express.Request, res: express.Response) {
    try {
        const deviceId = Date.now().toString();
        const dpsTransport = new DPSMqtt();
        const securityClient = new SymmetricKeySecurityClient(deviceId, key);
        const dpsClient = ProvisioningDeviceClient.create(host, scopeId, dpsTransport, securityClient);

        dpsClient.register((err, result) => {
            if (err) {
                callback(err, null);
            } else {
                const connectionString = 'HostName=' + result.assignedHub + ';DeviceId=' + result.deviceId + ';SharedAccessKey=' + key;
                const iothubClient = Client.fromConnectionString(connectionString, IoTHubMqtt);

                iothubClient.open(err => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, iothubClient);
                    }
                });
            }
        });
        res.status(200).json();
    } catch (e) {
        const error = {
            code: 400,
            message: e.message
        };
        res.status(400).json({ error });
    }
}

function callback(error: any, iothubClient: any) {
    console.log(error);
    console.log(iothubClient);
}
