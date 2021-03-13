import { model, Schema } from 'mongoose';
import mongoose from '../constants/mongoose';
import IUserModel from '../interfaces/usermodel';

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  state: {
    type: Number,
    required: true,
  },
});

const UserModel = model<IUserModel>(mongoose.USER_MODEL, userSchema);

export default UserModel;
