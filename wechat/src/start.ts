import { getAccessToken } from './login';
import { listUsers } from './users';
import { appId, appSecret, accessToken } from './constant';

async function main() {
    console.log('Start');
    console.log('#'.repeat(100));

    let token = accessToken;
    if (!token) {
        const tokenResponse = await getAccessToken(appId, appSecret);
        token = tokenResponse.access_token;
    }
    console.log(token);

    const users = await listUsers(token);
    if (users.data) {
        console.log(users.total);
        users.data.openid.forEach(u => console.log(u));
    }
}

main()
    .then(data => {
        console.log('#'.repeat(100));
        console.log('Done');
    })
    .catch(e => console.error(e));


