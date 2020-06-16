import * as express from 'express';
import { Client } from 'azure-iot-device';
import { Mqtt as IoTHubMqtt } from 'azure-iot-device-mqtt';
import { ProvisioningDeviceClient } from 'azure-iot-provisioning-device';
import { SymmetricKeySecurityClient } from 'azure-iot-security-symmetric-key';
import { Mqtt as DPSMqtt } from 'azure-iot-provisioning-device-mqtt';
import { fetchResult, computeDrivedSymmetricKey } from '../common/util';
import { Device } from '../common/types';
import { host, scopeId, apiToken, primaryKey } from '../common/constant';

export async function createDeviceByApi(deviceId: string, simulated = true): Promise<Device> {
    const simDevice: Device = {
        id: deviceId,
        displayName: `${deviceId}-sim`,
        description: `${deviceId}-desc`,
        instanceOf: 'urn:f9va_utuf:modelDefinition:_xpulqjczp',
        simulated,
        approved: true
    };
    const result = await setDevice(simDevice);
    console.log(result);
    return result;
}

export async function createDeviceByDps(deviceId: string): Promise<void> {
    const iothubClient = await registerDevice(deviceId);
    iothubClient.emit(deviceId, 'values');
}

async function registerDevice(deviceId: string): Promise<Client> {
    const key = computeDrivedSymmetricKey(primaryKey, deviceId);
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
            authorization: apiToken
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
            authorization: apiToken
        },
        method: 'GET'
    };
    return await fetchResult<Device>(url, options);
}