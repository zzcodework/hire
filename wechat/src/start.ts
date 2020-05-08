import { getAccessToken } from './login';
import { TokenResponse, Users } from './types';
import { listUsers } from './users';

const appId = 'wx40f8c75254235242';
const appSecret = '';

async function main() {
    console.log('Start');
    console.log('#'.repeat(100));

    let accessToken = '';
    if (!accessToken) {
        const tokenResponse: TokenResponse = await getAccessToken(appId, appSecret);
        accessToken = tokenResponse.access_token;
    }
    console.log(accessToken);

    const users: Users = await listUsers(accessToken);
    console.log(users);
}

main()
    .then(data => {
        console.log('#'.repeat(100));
        console.log('Done');
    })
    .catch(e => console.error(e));
