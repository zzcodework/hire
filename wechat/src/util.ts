import * as request from 'request';

export async function fetchResult<T>(url: string, options: request.CoreOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        request(url, options, (err, res, body) => {
            if (err) {
                reject(err);
            }
            // console.log(res);
            resolve(JSON.parse(body));
        });
    });
}