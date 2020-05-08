import { getAccessToken } from './login';
import { listUsers } from './users';

const appId = 'wx40f8c75254235242';
const appSecret = '';
let accessToken = '';

async function main() {
    console.log('Start');
    console.log('#'.repeat(100));

    if (!accessToken) {
        const tokenResponse = await getAccessToken(appId, appSecret);
        accessToken = tokenResponse.access_token;
    }
    console.log(accessToken);

    const users = await listUsers(accessToken);
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
