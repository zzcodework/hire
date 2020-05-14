import * as express from 'express';
import { helloRouter } from './routes/hello';
import { tokenRouter } from './routes/token';
import { defaultRouter } from './routes/default';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/hello', helloRouter);
app.use('/api/token', tokenRouter);
app.use('/', defaultRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});