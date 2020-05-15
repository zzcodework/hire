import * as express from 'express';
import { helloRouter } from './routes/hello';
import { defaultRouter } from './routes/default';
import { openidRouter } from './routes/openid';
import { userRouter } from './routes/user';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/hello', helloRouter);
app.use('/api/user', userRouter);
app.use('/api/openid', openidRouter);
app.use('/', defaultRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});