import { Application } from 'egg';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String },
  type: { type: String },
  avatarUrl: { type: String },
  email: { type: String },
  userId: { type: String },
  psw: { type: String },
});

export interface IUser {
  name: string;
  type: string;
  avatarUrl: string;
  email: string;
  userId: string;
  psw: string;
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  return mongoose.model('User', UserSchema);
};
