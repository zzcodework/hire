import * as express from 'express';
import { helloRouter } from './routes/hello';
import { defaultRouter } from './routes/default';
import { openidRouter } from './routes/openid';
import { deviceRouter } from './routes/device';
import { user as userApp } from './apps/user';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/hello', helloRouter);
app.use('/api/users', userApp);
app.use('/api/openid', openidRouter);
app.use('/api/devices', deviceRouter);
app.use('/', defaultRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});