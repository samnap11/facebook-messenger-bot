import express, { json, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routers from './routers';

dotenv.config();

const port = process.env.PORT || 3030;

const app = express();
app.use(json());

app.use(morgan('dev'));

app.use(routers);

app.get('/', (_, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => console.log(`App is running on port ${port}`));
