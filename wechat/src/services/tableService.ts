import * as storage from 'azure-storage';
import { User } from '../common/types';
import * as express from 'express';
import { usersTableConnectionString } from '../common/constant';

const tableName = 'wechat';

export async function upsertEntity(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
        const tableService = storage.createTableService(usersTableConnectionString);
        const entGen = storage.TableUtilities.entityGenerator;

        const entity = {
            PartitionKey: entGen.String(user.id),
            RowKey: entGen.String(user.id),
            name: entGen.String(user.name),
            openId: entGen.String(user.openid),
            avatarUrl: entGen.String(user.avatarUrl)
        };

        tableService.insertOrReplaceEntity(tableName, entity, (error, result, response) => {
            if (error) {
                reject(error);
            }
            console.log(response);
            resolve(result);
        });
    });
}

export async function deleteEntity(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const tableService = storage.createTableService(usersTableConnectionString);
        const descriptor = {
            PartitionKey: userId,
            RowKey: userId
        };
        tableService.deleteEntity(tableName, descriptor, err => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(userId);
        });
    });
}