import { Application } from 'egg';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String },
  sex: { type: String },
  psw: { type: String },
});

export interface IUser {
  name: string;
  sex: string;
  psw: string;
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  return mongoose.model('User', UserSchema);
};
