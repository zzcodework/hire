import { ResourceManagementClient } from 'azure-arm-resource';
import * as msRestAzure from 'ms-rest-azure';

const location = `eastus`;
const uniqueIdentifier = Date.now();
const freeAppName = `iotc-free-${location}-${uniqueIdentifier}`;
const paidAppName = `iotc-paid-${location}-${uniqueIdentifier}`;

const iotAppFreeArmTemplate = {
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "resources": [
        {
            "type": "Microsoft.IoTCentral/IoTApps",
            "name": freeAppName,
            "sku": {
                "name": "F1"
            },
            "location": location,
            "apiVersion": "2017-07-01-privatepreview",
            "properties": {
                "displayName": freeAppName,
                "subdomain": freeAppName.replace('-', '')
            }
        }
    ]
}

const iotAppPaidArmTemplate = {
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "resources": [
        {
            "type": "Microsoft.IoTCentral/IoTApps",
            "name": paidAppName,
            "sku": {
                "name": "S1"
            },
            "location": location,
            "apiVersion": "2017-07-01-privatepreview",
            "properties": {
                "displayName": paidAppName,
                "subdomain": paidAppName.replace('-', '')
            }
        }
    ]
}


const bigmacSubscriptionId = '9ac3e41b-af82-4029-8b27-f2d970785e71';
const resourceGroupName = 'iotc-arm-template';
const resourceGroupLocation = 'East US';
const deploymentName = `iotc-arm-template-deployment-${uniqueIdentifier}`;
const deployment = {
    properties: {
        mode: 'Incremental',
        template: iotAppPaidArmTemplate
    }
};

async function deploy() {
    const credentials = await msRestAzure.interactiveLogin();
    const client = new ResourceManagementClient(credentials, bigmacSubscriptionId);
    const isResourceGroupExists = await client.resourceGroups.checkExistence(resourceGroupName);
    if (!isResourceGroupExists) {
        await client.resourceGroups.createOrUpdate(resourceGroupName, { location: resourceGroupLocation });
    }
    console.log(`Resource group ${resourceGroupName} has been created or already existed in ${resourceGroupLocation}`);
    const deploymentExtended = await client.deployments.createOrUpdate(resourceGroupName, deploymentName, deployment);
    console.log(`Deployment ${deploymentName} has been submitted`);
    return deploymentExtended;
}

deploy().then(extended => console.log(extended));