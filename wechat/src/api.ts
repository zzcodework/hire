import * as express from 'express';
import { helloRouter } from './routes/hello';
import { tokenRouter } from './routes/token';

const app = express();
const port = 3000;

app.use('/api/hello', helloRouter);
app.use('/api/token', tokenRouter);

app.listen(port);

console.log(`http://localhost:${port}`);