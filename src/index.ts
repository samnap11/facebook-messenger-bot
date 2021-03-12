import express, { json, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routers from './routers';
import connectDB from './database';

dotenv.config();

const app = express();

const main = async () => {
  try {
    console.log(process.env.MONGODB_URI as string);
    await connectDB();
    console.log('MongoDB is connected!');

    const port = process.env.PORT || 3030;

    app.use(json());

    app.use(morgan('dev'));

    app.use(routers);

    app.get('/', (_, res: Response) => {
      res.send('Hello, World!');
    });

    app.listen(port, () => console.log(`App is running on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

main();
