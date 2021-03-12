import express, { Response } from 'express';
import morgan from 'morgan';

const port = process.env.PORT || 3030;

const app = express();

app.use(morgan('dev'));

app.get('/', (_, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => console.log(`App is running on port ${port}`));
