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

export async function deleteEntity(user: User): Promise<User> {
    const tableService = storage.createTableService();
    const entGen = storage.TableUtilities.entityGenerator;

    const entity = {
        PartitionKey: entGen.String('part2'),
        RowKey: entGen.String('row1'),
        taskDone: entGen.Boolean(true),
    };

    tableService.insertOrReplaceEntity(tableName, entity, (error, result, response) => {
        if (!error) {
            // result contains the entity with field 'taskDone' set to `true`
        }
    });

    return {
        id: 'zz',
        name: 'zz-name',
        openid: 'zz-openid',
        avatarUrl: ''
    };
}