import * as request from 'request';

export async function fetchResult<T>(url: string, options: request.CoreOptions): Promise<T> {
    return new Promise((resolve, reject) => {
        request(url, options, (err, res, body) => {
            if (err) {
                reject(err);
            }
            // console.log(res);
            resolve(body);
        });
    });
}