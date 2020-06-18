import * as express from 'express';
import * as bodyParser from 'body-parser';
import { helloRouter } from './routes/hello';
import { defaultRouter } from './routes/default';
import { openidRouter } from './routes/openid';
import { deviceRouter } from './routes/device';
import { user as userApp } from './apps/user';
import { device as deviceApp } from './apps/device';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/hello', helloRouter);
app.use('/api/users', userApp);
app.use('/api/openid', openidRouter);
app.use('/api/devices', deviceApp);
app.use('/', defaultRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});