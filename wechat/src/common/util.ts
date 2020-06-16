import * as request from 'request';
import * as crypto from 'crypto';

export async function fetchResult<T>(url: string, options: request.CoreOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        request(url, options, (err, res, body) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(body));
        });
    });
}

export function computeDrivedSymmetricKey(masterKey: string, regId: string): string {
    return crypto.createHmac('SHA256', Buffer.from(masterKey, 'base64'))
        .update(regId, 'utf8')
        .digest('base64');
}
