import { Document } from 'mongoose';

interface IUserModel extends Document {
  id: string;
  firstname?: string;
  birthdate?: Date;
  state: number;
}

export default IUserModel;
