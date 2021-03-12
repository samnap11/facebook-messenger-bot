import { connect } from 'mongoose';

const connectDB = async () => {
  await connect(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

export default connectDB;
