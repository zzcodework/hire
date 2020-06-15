import * as storage from 'azure-storage';
import { User } from '../common/types';
import * as express from 'express';

const accountName = 'wechatmeet';
const tableName = 'wechat';

export async function upsertEntity(req: express.Request, res: express.Response): Promise<User> {
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

    const user: User = {
        id: 'zz',
        name: 'zz-name',
        openid: 'zz-openid',
        avatarUrl: ''
    };
    return user;
}