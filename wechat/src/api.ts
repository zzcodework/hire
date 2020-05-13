import * as express from 'express';
import { helloRouter } from './routes/hello';
import { tokenRouter } from './routes/token';
import { defaultRouter } from './routes/default';

const app = express();
const port = process.env.port || 3000;

app.use('/', defaultRouter);
app.use('/api/hello', helloRouter);
app.use('/api/token', tokenRouter);

const server = app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
